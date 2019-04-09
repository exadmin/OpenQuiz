package com.xartifex.simplequiz.rest;

import com.xartifex.simplequiz.model.PlayerState;
import org.slf4j.Logger;

import javax.inject.Inject;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement
public class Game {

    @Inject
    @XmlTransient
    private Logger log;
    //todo: add given answer
    private String playerName;
    private PlayerState playerState;
    private long questionId;
    private String question;
    private int questionsLeft;
    private long timeLeft;
    private int points;
    private Error errorCode;
    private String error;

    public Game(String playerName, PlayerState playerState, long questionId, String question, int questionsLeft, long timeLeft) {
        this.playerName = playerName;
        this.playerState = playerState;
        this.questionId = questionId;
        this.question = question;
        this.questionsLeft = questionsLeft;
        this.timeLeft = timeLeft;
    }

    public Game() {
        playerState = PlayerState.BEFORE_GAME;
    }

    public Game(String playerName, int points) {
        this.playerName = playerName;
        playerState = PlayerState.GAME_OVER;
        this.points = points;
    }

    public Game(Error errorCode, String error) {
        this.errorCode = errorCode;
        this.error = error;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public Logger getLog() {
        return log;
    }

    public void setLog(Logger log) {
        this.log = log;
    }

    public PlayerState getPlayerState() {
        return playerState;
    }

    public void setPlayerState(PlayerState playerState) {
        this.playerState = playerState;
    }

    public long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public int getQuestionsLeft() {
        return questionsLeft;
    }

    public void setQuestionsLeft(int questionsLeft) {
        this.questionsLeft = questionsLeft;
    }

    public long getTimeLeft() {
        return timeLeft;
    }

    public void setTimeLeft(long timeLeft) {
        this.timeLeft = timeLeft;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Error getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Error errorCode) {
        this.errorCode = errorCode;
    }

    @Override
    public String toString() {
        return "Game{" +
                "playerName='" + playerName + '\'' +
                ", playerState=" + playerState +
                ", questionId=" + questionId +
                ", question='" + question + '\'' +
                ", questionsLeft=" + questionsLeft +
                ", timeLeft=" + timeLeft +
                ", points=" + points +
                ", errorCode=" + errorCode +
                ", error='" + error + '\'' +
                '}';
    }
}
