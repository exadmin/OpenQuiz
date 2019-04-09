package com.xartifex.simplequiz.data;

import com.xartifex.simplequiz.model.Player;
import com.xartifex.simplequiz.model.Question;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;

import javax.inject.Inject;
import javax.transaction.NotSupportedException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;

@RunWith(Arquillian.class)
public class GameDAOTest {
    @Inject
    Logger log;

    @Inject
    GameDAO modelDAO;

    @Inject
    UserTransaction utx;

    @Deployment
    public static Archive<?> createTestArchive() {
        return ShrinkWrap
                .create(WebArchive.class, "data-test.war")
                .addPackage("com.xartifex.simplequiz.common")
                .addPackage("com.xartifex.simplequiz.model")
                .addPackage("com.xartifex.simplequiz.data")
                .addClass(EntityManagerProducer.class)
                .addAsResource("META-INF/test-persistence.xml", "META-INF/persistence.xml")
                .addAsWebInfResource("META-INF/log4j.properties", "classes/log4j.properties")
                .addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
                .addAsWebInfResource("arquillian-ds.xml");
    }

    @Before
    public void setUp() throws SystemException, NotSupportedException {
        utx.begin();
    }

    @After
    public void commitTransaction() throws Exception {
        utx.commit();
    }

    @Test
    public void testReturnNotNullRandomQuestion() throws Exception {
        Assert.assertNotNull(modelDAO.getQuestionForNewPlayer());
    }

    @Test
    public void testReturnSomeNotAnsweredQuestion() throws Exception {
        Player player = modelDAO.findByName(TestDataCreator.PLAYER_NAME);
        Assert.assertNotNull(player);
        Question question = modelDAO.getNextQuestion(player);
        Assert.assertTrue(TestDataCreator.QUESTION_3.equals(question.getQuestion()));
    }
}
