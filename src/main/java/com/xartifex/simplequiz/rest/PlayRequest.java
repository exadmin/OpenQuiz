package com.xartifex.simplequiz.rest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class PlayRequest {
    public static final PlayRequest GET_NEXT_QUESTION = new PlayRequest(Command.NEXT_QUESTION);
    public static final PlayRequest EMPTY_REQUEST = new PlayRequest();

    Command command;
    long questionId;
    String answer;

    public PlayRequest() {
        //empty play request
    }

    public PlayRequest(Command command) {
        this.command = command;
    }

    public PlayRequest(long questionId, String answer) {
        this.command = Command.ANSWER;
        this.questionId = questionId;
        this.answer = answer;
    }

    public Command getCommand() {
        return command;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "PlayRequest{" +
                "command=" + command +
                ", questionId=" + questionId +
                ", answer='" + answer + '\'' +
                '}';
    }
}
