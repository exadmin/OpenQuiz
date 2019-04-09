package com.xartifex.simplequiz.rest;

import com.xartifex.simplequiz.model.PlayerState;
import com.xartifex.simplequiz.user.UserInfo;
import com.xartifex.simplequiz.user.UserInfoProvider;
import org.hamcrest.Matchers;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.extension.rest.client.ArquillianResteasyResource;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.Maven;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.DatatypeConverter;
import java.io.UnsupportedEncodingException;

import static com.xartifex.simplequiz.rest.Error.*;

import java.util.ArrayList;
import java.util.List;

import static com.xartifex.simplequiz.rest.TestDataCreator.*;
import static com.xartifex.simplequiz.rest.TestUserInfoProvider.TEST_USER_EMAIL;
import static com.xartifex.simplequiz.rest.TestUserInfoProvider.TEST_USER_NAME;


@RunWith(Arquillian.class)
public class GameTest {

    @Deployment
    public static Archive<?> createTestArchive() {
        return ShrinkWrap
                .create(WebArchive.class, "rest-test.war")
                .addPackage("com.xartifex.simplequiz.rest")
                .addPackage("com.xartifex.simplequiz.common")
                .addPackage("com.xartifex.simplequiz.data")
                .addPackage("com.xartifex.simplequiz.model")
                .addPackage("com.xartifex.simplequiz.util")
                .addClass(UserInfo.class)
                .addClass(UserInfoProvider.class)
                .addAsResource("META-INF/test-persistence.xml",
                        "META-INF/persistence.xml")
                .addAsResource("import.sql")
                .addAsWebInfResource("WEB-INF/beans.xml", "beans.xml")
                .addAsWebInfResource("WEB-INF/simple-quiz-test-ds.xml",
                        "simple-quiz-test-ds.xml")
                .addAsWebInfResource("WEB-INF/jboss-web.xml", "jboss-web.xml")
                .addAsWebInfResource("WEB-INF/web.xml", "web.xml")
                .addAsLibraries(Maven.resolver().resolve("me.xdrop:fuzzywuzzy:1.1.8")
                        .withoutTransitivity().asSingleFile());
    }

    private String getBasicAuthentication() {
        String token = TEST_USER_EMAIL + ":1";
        try {
            return "BASIC " + DatatypeConverter.printBase64Binary(token.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException ex) {
            throw new IllegalStateException("Cannot encode with UTF-8", ex);
        }
    }

    Logger log = LoggerFactory.getLogger(GameTest.class);

    @Test
    @RunAsClient
    public void playGame(@ArquillianResteasyResource WebTarget webTarget) throws InterruptedException {
        Game game = makeRequest(new PlayRequest(), webTarget);
        Assert.assertTrue(PlayerState.BEFORE_GAME.equals(game.getPlayerState()));
        game = makeRequest(PlayRequest.GET_NEXT_QUESTION, webTarget);
        Assert.assertTrue(PlayerState.IN_GAME.equals(game.getPlayerState()));
        long timeLeft = game.getTimeLeft();
        Thread.sleep(100);
        game = makeRequest(PlayRequest.EMPTY_REQUEST, webTarget);
        Assert.assertTrue(PlayerState.IN_GAME.equals(game.getPlayerState()));
        long timeLeft2 = game.getTimeLeft();
        Assert.assertTrue(timeLeft - timeLeft2 > 100);
        //provide empty answer
        game = makeRequest(new PlayRequest(game.getQuestionId(),
                ""), webTarget);
        Assert.assertThat(game.getErrorCode(), Matchers.equalTo(EMPTY_ANSWER_PROVIDED));
        //error game object returned, need to actualize game object
        game = makeRequest(PlayRequest.EMPTY_REQUEST, webTarget);
        Assert.assertThat(game.getPlayerState(), Matchers.equalTo(PlayerState.IN_GAME));
        //provide correct answer
        game = makeRequest(new PlayRequest(game.getQuestionId(),
                TestDataCreator.getCorrectAnswer(game.getQuestion())), webTarget);
        Assert.assertThat(game.getPlayerState(), Matchers.equalTo(PlayerState.BETWEEN_QUESTIONS));
        //trying to answer the same question second time
        game = makeRequest(new PlayRequest(game.getQuestionId(),
                TestDataCreator.getCorrectAnswer(game.getQuestion())), webTarget);
        Assert.assertTrue(NOTHING_TO_ANSWER_YET.equals(game.getErrorCode()));
        //restore game object
        game = makeRequest(PlayRequest.EMPTY_REQUEST, webTarget);
        Assert.assertTrue(PlayerState.BETWEEN_QUESTIONS.equals(game.getPlayerState()));
        Assert.assertThat(game.getQuestionsLeft(), Matchers.equalTo(4));
        //
        game = makeRequest(PlayRequest.GET_NEXT_QUESTION, webTarget);
        Assert.assertThat(game.getQuestionsLeft(), Matchers.equalTo(3));
        Assert.assertThat(game.getPlayerState(), Matchers.equalTo(PlayerState.IN_GAME));
        Thread.sleep(6000L);
        game = makeRequest(new PlayRequest(game.getQuestionId(), TestDataCreator.getCorrectAnswer(game.getQuestion()))
                , webTarget); //too late
        Assert.assertThat(game.getErrorCode(), Matchers.equalTo(TIMEOUT_EXPIRED));
        game = makeRequest(PlayRequest.EMPTY_REQUEST, webTarget);
        Assert.assertThat(game.getPlayerState(), Matchers.equalTo(PlayerState.BETWEEN_QUESTIONS));
        //
        game = makeRequest(PlayRequest.GET_NEXT_QUESTION, webTarget);
        Assert.assertThat(game.getQuestionsLeft(), Matchers.equalTo(2));
        Assert.assertThat(game.getPlayerState(), Matchers.equalTo(PlayerState.IN_GAME));
        game = makeRequest(new PlayRequest(game.getQuestionId(), TestDataCreator.getCorrectAnswer(game.getQuestion()))
                , webTarget);
        //
        game = makeRequest(PlayRequest.GET_NEXT_QUESTION, webTarget);
        Assert.assertThat(game.getQuestionsLeft(), Matchers.equalTo(1));
        Assert.assertThat(game.getPlayerState(), Matchers.equalTo(PlayerState.IN_GAME));
        game = makeRequest(new PlayRequest(game.getQuestionId(), TestDataCreator.getCorrectAnswer(game.getQuestion()))
                , webTarget);
        //
        game = makeRequest(PlayRequest.GET_NEXT_QUESTION, webTarget);
        Assert.assertThat(game.getQuestionsLeft(), Matchers.equalTo(0));
        Assert.assertThat(game.getPlayerState(), Matchers.equalTo(PlayerState.IN_GAME));
        game = makeRequest(new PlayRequest(game.getQuestionId(), "incorrect answer")
                , webTarget);
        Assert.assertThat(PlayerState.GAME_OVER, Matchers.equalTo(game.getPlayerState()));
        Assert.assertThat(game.getPoints(), Matchers.equalTo(3));
    }

    private Game makeRequest(PlayRequest request, WebTarget webTarget) {
        Response response = webTarget.path("/play")
                .request().header("Authorization", getBasicAuthentication())
                .buildPost(Entity.entity(request
                        , MediaType.APPLICATION_JSON)).invoke();
        return response.readEntity(Game.class);
    }


}