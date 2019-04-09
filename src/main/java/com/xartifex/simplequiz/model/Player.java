package com.xartifex.simplequiz.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"name"}, name = "UNIQUE_PLAYER"))
public class Player implements Serializable {
    @Id
    @GeneratedValue
    private long id;

    @NotNull
    @Size(min = 1, max = 200, message = "1-200 letters and spaces")
    private String name;

    @ManyToOne
    //can be null
    private Question currentQuestion;

    @NotNull
    private PlayerState playerState = PlayerState.BEFORE_GAME;

    private int questionsLeft = 10;

    @OneToMany
    private Set<PlayerAnswerState> playerAnswers = new HashSet<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Question getCurrentQuestion() {
        return currentQuestion;
    }

    public void setCurrentQuestion(Question currentQuestion) {
        this.currentQuestion = currentQuestion;
    }

    public PlayerState getPlayerState() {
        return playerState;
    }

    public void setPlayerState(PlayerState playerState) {
        this.playerState = playerState;
    }

    public int getQuestionsLeft() {
        return questionsLeft;
    }

    public void setQuestionsLeft(int questionsLeft) {
        this.questionsLeft = questionsLeft;
    }

    public Set<PlayerAnswerState> getPlayerAnswers() {
        return playerAnswers;
    }

    public void setPlayerAnswers(Set<PlayerAnswerState> playerAnswers) {
        this.playerAnswers = playerAnswers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Player player = (Player) o;

        if (id != player.id) return false;
        return name.equals(player.name);
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + name.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", currentQuestion=" + currentQuestion +
                ", playerState=" + playerState +
                ", questionsLeft=" + questionsLeft +
                ", playerAnswers=" + playerAnswers +
                '}';
    }
}
