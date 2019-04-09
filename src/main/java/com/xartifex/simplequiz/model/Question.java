package com.xartifex.simplequiz.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"question"}, name = "UNIQUE_QUESTION"))
public class Question implements Serializable {
    @Id
    @GeneratedValue
    private long id;

    @NotNull
    @Size(min = 1, max = 4000, message = "1-4000 letters and spaces")
    private String question;

    @NotNull
    @Size(min = 1, max = 2000, message = "1-2000 letters and spaces")
    protected String answer;

    @NotNull
    long timeout = 70000;

    private int points = 1;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public long getTimeout() {
        return timeout;
    }

    public void setTimeout(long timeout) {
        this.timeout = timeout;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Question question1 = (Question) o;

        if (id != question1.id) return false;
        return question.equals(question1.question);
    }

    @Override
    public int hashCode() {
        return question.hashCode();
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", question='" + question + '\'' +
                ", answer='" + answer + '\'' +
                ", timeout=" + timeout +
                ", points=" + points +
                '}';
    }

    public String toShortString() {
        return  question  + " Ответ: " + answer + "|" + id + ";";
    }
}
