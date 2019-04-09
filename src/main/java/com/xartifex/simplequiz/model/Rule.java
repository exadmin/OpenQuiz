package com.xartifex.simplequiz.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table
public class Rule implements Serializable {
    @Id
    @GeneratedValue
    private long id;

    @NotNull
    @Size(min = 1, max = 4000, message = "1-4000 letters and spaces")
    private String rule;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getText() {
        return rule;
    }

    public void setText(String text) {
        this.rule = text;
    }

    public Rule() {
    }

    public Rule(String rule) {
        this.rule = rule;
    }

    public Rule(long id, String rule) {
        this.id = id;
        this.rule = rule;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Rule rule = (Rule) o;

        if (id != rule.id) return false;
        return rule.equals(rule.rule);
    }

    @Override
    public int hashCode() {
        return rule.hashCode();
    }

    @Override
    public String toString() {
        return "Rules{" +
                "id=" + id +
                ", text='" + rule + '\'' +
                '}';
    }
}
