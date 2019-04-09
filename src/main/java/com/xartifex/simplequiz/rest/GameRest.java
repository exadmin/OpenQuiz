package com.xartifex.simplequiz.rest;

import com.xartifex.simplequiz.data.GameDAO;
import com.xartifex.simplequiz.model.*;
import com.xartifex.simplequiz.user.UserInfo;
import com.xartifex.simplequiz.user.UserInfoProvider;
import com.xartifex.simplequiz.util.StringUtils;
import com.xartifex.simplequiz.util.Util;
import me.xdrop.fuzzywuzzy.FuzzySearch;
import org.slf4j.Logger;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import javax.transaction.*;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.security.Principal;


@RolesAllowed({"players"})
@Path("/play")
@Stateless
public class GameRest {

    public static final int MATCH_THRESHOLD = 84;

    @Inject
    Logger log;

    @Inject
    GameDAO gameDAO;

    @Inject
    UserInfoProvider userInfoProvider;

    @Inject
    @NotNull
    Principal principal;

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
    //todo: return encoded question instead of plain text
    public Response getGame(PlayRequest playRequest) throws SystemException, NotSupportedException, HeuristicRollbackException, HeuristicMixedException, RollbackException {
        try {
            String playerName = principal.getName();
            if (playerName == null || playerName.isEmpty()) {
                throw new IllegalStateException("No playerName supplied!");
            }
            Player player = gameDAO.findByName(playerName);
            UserInfo userInfo = userInfoProvider.getUserInfoByEmail(playerName);
            String userName = userInfo.resolveName();
            //initialize the player if not already
            if (player == null) {
                player = new Player();
                player.setName(playerName);
                Question question = gameDAO.getQuestionForNewPlayer();
                player.setCurrentQuestion(question);
                gameDAO.addPlayer(player);
            }
            PlayerState playerState = player.getPlayerState();
            Command command = playRequest.getCommand();
            Question question = player.getCurrentQuestion();
            if (question == null) {
                throw new IllegalStateException("Null question of player: " + player);
            }
            if (command == null) {
                if (PlayerState.GAME_OVER.equals(playerState)) {
                    return ok(new Game(userName, getPlayerPoints(player)));
                } else if (PlayerState.BEFORE_GAME.equals(playerState)) {
                    return ok(new Game());
                } else if (PlayerState.IN_GAME.equals(playerState)
                        || PlayerState.BETWEEN_QUESTIONS.equals(playerState)) {
                    PlayerAnswerState playerAnswer = getAnswerByQuestion(question, player);
                    return ok(new Game(userName,
                            player.getPlayerState(),
                            question.getId(),
                            Util.encode(question.getQuestion()),
                            player.getQuestionsLeft(),
                            getRemainingTime(playerAnswer.getExpiresOn())));
                }
                throw new IllegalStateException("Unknown program state! " + player);
            } else {
                switch (command) {
                    case NEXT_QUESTION: {
                        if (PlayerState.GAME_OVER.equals(playerState)) {
                            return error(Error.GAME_ALREADY_FINISHED);
                        } else if (PlayerState.BEFORE_GAME.equals(player.getPlayerState())) {
                            PlayerAnswerState playerAnswer = new PlayerAnswerState();
                            playerAnswer.setPlayer(player);
                            playerAnswer.setQuestion(question);
                            playerAnswer.setExpiresOn(System.currentTimeMillis()
                                    + question.getTimeout() + 100);
                            gameDAO.persistAnswer(playerAnswer);
                            //remove old info and add new info for the same pair player-question
                            player.getPlayerAnswers().remove(playerAnswer);
                            player.getPlayerAnswers().add(playerAnswer);
                            player.setPlayerState(PlayerState.IN_GAME);
                            player.setQuestionsLeft(player.getQuestionsLeft() - 1);
                            player = gameDAO.updatePlayer(player);
                            return ok(new Game(userName,
                                    player.getPlayerState(),
                                    question.getId(),
                                    Util.encode(question.getQuestion()),
                                    player.getQuestionsLeft(),
                                    getRemainingTime(playerAnswer.getExpiresOn())
                            ));
                        } else if (PlayerState.IN_GAME.equals(playerState)
                                || PlayerState.BETWEEN_QUESTIONS.equals(playerState)) {
                            PlayerAnswerState currentAnswer = getAnswerByQuestion(question, player);
                            if (getRemainingTime(currentAnswer.getExpiresOn()) > 0
                                    && currentAnswer.getAnswer() == null) {
                                return error(Error.CURRENT_QUESTION_NOT_ANSWERED);
                            } else {
                                //consider current answer answered even if expired
                                //and give another question if possible
                                if (player.getQuestionsLeft() <= 0) {
                                    player.setPlayerState(PlayerState.GAME_OVER);
                                    gameDAO.updatePlayer(player);
                                    return ok(new Game(userName, getPlayerPoints(player)));
                                } else {
                                    Question nextQuestion = gameDAO.getNextQuestion(player);
                                    if (nextQuestion == null) {
                                        throw new IllegalStateException("Not enough questions in the database!");
                                    }
                                    PlayerAnswerState playerAnswerState = new PlayerAnswerState();
                                    playerAnswerState.setPlayer(player);
                                    playerAnswerState.setQuestion(nextQuestion);
                                    playerAnswerState.setExpiresOn(System.currentTimeMillis() + question.getTimeout());
                                    gameDAO.addPlayersAnswer(playerAnswerState);
                                    player.setCurrentQuestion(nextQuestion);
                                    player.getPlayerAnswers().add(playerAnswerState);
                                    player.setQuestionsLeft(player.getQuestionsLeft() - 1);
                                    player.setPlayerState(PlayerState.IN_GAME);
                                    player = gameDAO.updatePlayer(player);
                                    return ok(new Game(userName,
                                            player.getPlayerState(),
                                            nextQuestion.getId(),
                                            Util.encode(nextQuestion.getQuestion()),
                                            player.getQuestionsLeft(),
                                            getRemainingTime(playerAnswerState.getExpiresOn())));
                                }
                            }

                        }
                    }
                    case ANSWER: {
                        if (PlayerState.GAME_OVER.equals(playerState)) {
                            return error(Error.GAME_ALREADY_FINISHED);
                        } else if (PlayerState.BEFORE_GAME.equals(playerState)) {
                            return error(Error.GAME_NOT_STARTED_YET);
                        } else if (PlayerState.BETWEEN_QUESTIONS.equals(playerState)) {
                            return error(Error.NOTHING_TO_ANSWER_YET);
                        } else {
                            long questionId = playRequest.getQuestionId();
                            PlayerAnswerState playerAnswerState = getAnswerByQuestion(question, player);
                            long timeLeft = getRemainingTime(playerAnswerState.getExpiresOn());
                            if (playerAnswerState.getAnswer() != null) {
                                error(Error.QUESTION_ALREADY_ANSWERED);
                            } else if (timeLeft <= 0) {
                                player.setPlayerState(PlayerState.BETWEEN_QUESTIONS);
                                gameDAO.updatePlayer(player);
                                return error(Error.TIMEOUT_EXPIRED);
                            }
                            question = player.getCurrentQuestion();
                            if (question.getId() != questionId) {
                                return error(Error.INCORRECT_QUESTION_ID_PROVIDED);
                            }
                            String providedAnswer = playRequest.getAnswer();
                            if (providedAnswer == null || providedAnswer.isEmpty()) {
                                return error(Error.EMPTY_ANSWER_PROVIDED);
                            }
                            String correctAnswer = question.getAnswer();
                            providedAnswer = providedAnswer.trim().toLowerCase();
                            if (FuzzySearch.ratio(correctAnswer.trim().toLowerCase(),
                                    providedAnswer) >= MATCH_THRESHOLD) {
                                playerAnswerState.setCorrect(true);
                            }
                            playerAnswerState.setAnswer(providedAnswer);
                            playerAnswerState = gameDAO.updateAnswerState(playerAnswerState);
                            player.getPlayerAnswers().remove(playerAnswerState);
                            player.getPlayerAnswers().add(playerAnswerState);
                            if (player.getQuestionsLeft() == 0) {
                                player.setPlayerState(PlayerState.GAME_OVER);
                                gameDAO.updatePlayer(player);
                                return ok(new Game(userName, getPlayerPoints(player)));
                            }
                            player.setPlayerState(PlayerState.BETWEEN_QUESTIONS);
                            player = gameDAO.updatePlayer(player);
                            return ok(new Game(userName,
                                    player.getPlayerState(),
                                    questionId,
                                    Util.encode(question.getQuestion()),
                                    player.getQuestionsLeft(),
                                    getRemainingTime(playerAnswerState.getExpiresOn())));
                        }
                    }
                    default:
                        return error(Error.UNKNOWN_COMMAND);
                }
            }
        } catch (Exception e) {
            log.error("Error during /play invocation: ", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(
                    new Game(Error.UNEXPECTED_ERROR,
                            "Unexpected error.")).build();
        }
    }

    private Response error(Error error) {
        return Response.status(Response.Status.BAD_REQUEST).entity(new Game(error,
                "Bad request.")).build();
    }

    private Response ok(Game game) {
        return Response.status(Response.Status.OK).entity(game).build();
    }

    private PlayerAnswerState getAnswerByQuestion(Question question, Player player) {
        for (PlayerAnswerState playerAnswer : player.getPlayerAnswers()) {
            if (playerAnswer.getQuestion().equals(question)) {
                return playerAnswer;
            }
        }
        throw new IllegalStateException("No state found for question and player:"
                + question + " " + player);
    }

    private long getRemainingTime(long expiresOn) {
        long timeLeft = expiresOn - System.currentTimeMillis();
        return timeLeft > 0 ? timeLeft : 0;
    }

    private int getPlayerPoints(Player player) {
        int points = 0;
        for (PlayerAnswerState playerAnswerState : player.getPlayerAnswers()) {
            if (playerAnswerState.isCorrect()) {
                points += playerAnswerState.getQuestion().getPoints();
            }
        }
        return points;
    }
}
