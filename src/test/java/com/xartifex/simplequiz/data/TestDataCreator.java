package com.xartifex.simplequiz.data;

import com.xartifex.simplequiz.model.Player;
import com.xartifex.simplequiz.model.PlayerAnswerState;
import com.xartifex.simplequiz.model.Question;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.*;

//taken from here
// http://serviceorientedarchitect.com/how-to-seed-the-database-with-sample-data-for-an-arquillian-test/
@ApplicationScoped
public class TestDataCreator
{
    public static final String PLAYER_NAME = "T P";

    public static final String QUESTION_1 = "Question0?";
    public static final String ANSWER_1 = "bar";

    public static final String QUESTION_2 = "Question8?";
    public static final String ANSWER_2 = "bar";

    public static final String QUESTION_3 = "Question9?";
    public static final String ANSWER_3 = "bar";

    @PersistenceContext
    private EntityManager em;

    @Inject
    UserTransaction utx;


    @Inject
    GameDAO gameDAO;

    public void prepareDate(
            @Observes @Initialized(ApplicationScoped.class) final Object event) throws SystemException, NotSupportedException, HeuristicRollbackException, HeuristicMixedException, RollbackException {
        utx.begin();

        Question question1 = new Question();
        question1.setQuestion(QUESTION_1);
        question1.setAnswer(ANSWER_1);
        question1.setTimeout(5000);

        em.persist(question1);

        Question question2 = new Question();
        question2.setQuestion(QUESTION_2);
        question2.setAnswer(ANSWER_2);
        question2.setTimeout(5000);

        em.persist(question2);

        Question question3 = new Question();
        question3.setQuestion(QUESTION_3);
        question3.setAnswer(ANSWER_3);
        question3.setTimeout(5000);

        em.persist(question3);

        //
        Player player = new Player();
        player.setName(PLAYER_NAME);

        PlayerAnswerState playerAnswer1 = new PlayerAnswerState();
        playerAnswer1.setPlayer(player);
        playerAnswer1.setQuestion(question1);
        playerAnswer1.setExpiresOn(System.currentTimeMillis() + question1.getTimeout());
        playerAnswer1.setAnswer("some answer 1");
        playerAnswer1.setCorrect(false);

        PlayerAnswerState playerAnswer2 = new PlayerAnswerState();
        playerAnswer2.setPlayer(player);
        playerAnswer2.setQuestion(question2);
        playerAnswer2.setExpiresOn(System.currentTimeMillis() + question1.getTimeout());
        playerAnswer2.setAnswer(ANSWER_2);
        playerAnswer2.setCorrect(true);

        player.getPlayerAnswers().add(playerAnswer1);
        player.getPlayerAnswers().add(playerAnswer2);
        player.setCurrentQuestion(question2);

        em.persist(player);
        em.persist(playerAnswer1);
        em.persist(playerAnswer2);

        utx.commit();
    }
}