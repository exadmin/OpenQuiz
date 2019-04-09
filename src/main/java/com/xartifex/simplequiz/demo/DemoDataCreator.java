package com.xartifex.simplequiz.demo;

import com.xartifex.simplequiz.data.GameDAO;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.*;
import java.util.HashSet;
import java.util.Set;

//taken from here
// http://serviceorientedarchitect.com/how-to-seed-the-database-with-sample-data-for-an-arquillian-test/
@ApplicationScoped
public class DemoDataCreator
{
    public static final String QUESTION_1 = "Первое, что делаешь, когда приходишь домой?";
    //ANSWER_Q_A
    public static final String ANSWER_1_1 = "Ложишься спать";
    public static final int ANSWER_1_1_SCORE = 7;
    public static final int ANSWER_1_1_POPULARITY = 4;

    public static final String ANSWER_1_2 = "Ешь";
    public static final int ANSWER_1_2_SCORE = 100;
    public static final int ANSWER_1_2_POPULARITY = 1;


    public static final String QUESTION_2 = "Самое популярное имя собаки?";
    public static final String ANSWER_2_1 = "Барбос";
    public static final int ANSWER_2_1_SCORE = 97;
    public static final int ANSWER_2_1_POPULARITY = 3;

    public static final String ANSWER_2_2 = "Doggo";
    public static final int ANSWER_2_2_SCORE = 42;
    public static final int ANSWER_2_2_POPULARITY = 6;

    @PersistenceContext
    private EntityManager em;

    @Inject
    UserTransaction utx;

    @Inject
    GameDAO gameDAO;

    public void prepareData(
//            @Observes @Initialized(ApplicationScoped.class)
            final Object event) throws SystemException, NotSupportedException, HeuristicRollbackException, HeuristicMixedException, RollbackException {
        utx.begin();

//        Question question1 = new Question();
//        question1.setQuestion(QUESTION_1);
//
//        Answer answer11 = new Answer();
//        answer11.setQuestion(question1);
//        answer11.setAnswer(ANSWER_1_1);
//        answer11.setScore(ANSWER_1_1_SCORE);
//        answer11.setPopularity(ANSWER_1_1_POPULARITY);
//
//        Answer answer12 = new Answer();
//        answer12.setQuestion(question1);
//        answer12.setAnswer(ANSWER_1_2);
//        answer12.setScore(ANSWER_1_2_SCORE);
//        answer12.setPopularity(ANSWER_1_2_POPULARITY);
//
//        Set<Answer> answers1 = new HashSet<>();
//        answers1.add(answer11);
//        answers1.add(answer12);
//
//        question1.setAnswers(answers1);
//
//        em.persist(question1);
//        em.persist(answer11);
//        em.persist(answer12);
//
//        Question question2 = new Question();
//        question2.setQuestion(QUESTION_2);
//
//        Answer answer21 = new Answer();
//        answer21.setQuestion(question2);
//        answer21.setAnswer(ANSWER_2_1);
//        answer21.setScore(ANSWER_2_1_SCORE);
//        answer21.setPopularity(ANSWER_2_1_POPULARITY);
//
//        Answer answer22 = new Answer();
//        answer22.setQuestion(question2);
//        answer22.setAnswer(ANSWER_2_2);
//        answer22.setScore(ANSWER_2_2_SCORE);
//        answer22.setPopularity(ANSWER_2_2_POPULARITY);
//
//        Set<Answer> answers2 = new HashSet<>();
//        answers2.add(answer21);
//        answers2.add(answer22);
//
//        question2.setAnswers(answers2);
//        em.persist(question2);
//        em.persist(answer21);
//        em.persist(answer22);

        utx.commit();
    }
}