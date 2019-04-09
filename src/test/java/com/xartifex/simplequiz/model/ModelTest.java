/*
 * JBoss, Home of Professional Open Source
 * Copyright 2015, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.xartifex.simplequiz.model;


import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.NotSupportedException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;

import java.util.HashSet;
import java.util.Set;


@RunWith(Arquillian.class)
public class ModelTest {
    @Deployment
    public static Archive<?> createTestArchive() {
        return ShrinkWrap
                .create(WebArchive.class, "model-test.war")
                .addPackage("com.xartifex.simplequiz.model")
                .addPackage("com.xartifex.simplequiz.common")
                .addAsResource("META-INF/test-persistence.xml", "META-INF/persistence.xml")
                .addAsWebInfResource("META-INF/log4j.properties", "classes/log4j.properties")
                .addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
                .addAsWebInfResource("arquillian-ds.xml");
    }

    @PersistenceContext
    EntityManager entityManager;

    @Inject
    UserTransaction utx;

    @Inject
    Logger log;

    @Test
    @InSequence(1)
    public void testCreatePlayer() throws Exception {
        Question question = new Question();
        question.setQuestion("What is the meaning of life?");
        question.setAnswer("42");
        Player player = new Player();
        player.setName("TestPlayer");
        player.setCurrentQuestion(question);
        entityManager.persist(question);
        entityManager.persist(player);
        log.info("Question created " + player);
        log.info("Player created " + player);
    }

    @Test
    @InSequence(2)
    public void testSimulateGameTurn() throws Exception {
        Player player = new Player();
        player.setName("Test Player 1");

        Question question = new Question();
        question.setQuestion("Password?");
        question.setAnswer("password");

        //player asks for next question
        player.setPlayerState(PlayerState.IN_GAME);
        player.setCurrentQuestion(question); //retrieve next question from question provider
        player.setQuestionsLeft(player.getQuestionsLeft()-1);
        PlayerAnswerState playerAnswer = new PlayerAnswerState();
        playerAnswer.setPlayer(player);
        playerAnswer.setQuestion(question);
        playerAnswer.setExpiresOn(System.currentTimeMillis() + question.getTimeout());
        Set<PlayerAnswerState> answers = new HashSet<>();
        answers.add(playerAnswer);
        player.setPlayerAnswers(answers);

        entityManager.persist(question);
        entityManager.persist(player);
        entityManager.persist(playerAnswer);

        //player submits an answer for a question
        playerAnswer.setAnswer("password");
        playerAnswer.setCorrect(true);

        entityManager.merge(playerAnswer);

        System.out.println(question);
        System.out.println(player);
        System.out.println(playerAnswer);
    }

    @Before
    public void setUp() throws SystemException, NotSupportedException {
        utx.begin();
    }

    @After
    public void commitTransaction() throws Exception {
        utx.commit();
    }

}
