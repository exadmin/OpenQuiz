package com.xartifex.simplequiz.rest;

import com.xartifex.simplequiz.data.GameDAO;
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
    public static final long TEST_TIMEOUT = 5000L;

    public static final String CORRECT_ANSWER =  "bar";

    public static final String QUESTION_1 = "Question1?";
    public static final String ANSWER_1 = CORRECT_ANSWER;

    public static final String QUESTION_2 = "Question2?";
    public static final String ANSWER_2 = CORRECT_ANSWER;

    public static final String QUESTION_3 = "Question3?";
    public static final String ANSWER_3 = CORRECT_ANSWER;

    public static final String QUESTION_4 = "Question4?";
    public static final String ANSWER_4 = CORRECT_ANSWER;

    public static final String QUESTION_5 = "Question5?";
    public static final String ANSWER_5 = CORRECT_ANSWER;

    public static final String QUESTION_6 = "Question6?";
    public static final String ANSWER_6 = CORRECT_ANSWER;

    public static final String QUESTION_7 = "Question7?";
    public static final String ANSWER_7 = CORRECT_ANSWER;


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
        question1.setTimeout(TEST_TIMEOUT);

        em.persist(question1);

        Question question2 = new Question();
        question2.setQuestion(QUESTION_2);
        question2.setAnswer(ANSWER_2);
        question2.setTimeout(TEST_TIMEOUT);


        em.persist(question2);

        Question question3 = new Question();
        question3.setQuestion(QUESTION_3);
        question3.setAnswer(ANSWER_3);
        question3.setTimeout(TEST_TIMEOUT);

        em.persist(question3);

        Question question4 = new Question();
        question4.setQuestion(QUESTION_4);
        question4.setAnswer(ANSWER_4);
        question4.setTimeout(TEST_TIMEOUT);

        em.persist(question4);

        Question question5 = new Question();
        question5.setQuestion(QUESTION_5);
        question5.setAnswer(ANSWER_5);
        question5.setTimeout(TEST_TIMEOUT);

        em.persist(question5);

        Question question6 = new Question();
        question6.setQuestion(QUESTION_6);
        question6.setAnswer(ANSWER_6);
        question6.setTimeout(TEST_TIMEOUT);

        em.persist(question6);

        Question question7 = new Question();
        question7.setQuestion(QUESTION_7);
        question7.setAnswer(ANSWER_7);
        question7.setTimeout(TEST_TIMEOUT);

        em.persist(question7);

        Player player = new Player();
        player.setName("test@email.com");
        player.setQuestionsLeft(5);
        player.setCurrentQuestion(question1);

        em.persist(player);

        utx.commit();
    }

    public static String getCorrectAnswer(String question) {
        return CORRECT_ANSWER;
    }
}