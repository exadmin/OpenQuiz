package com.xartifex.simplequiz.data;

import com.xartifex.simplequiz.model.*;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.*;

@ApplicationScoped
public class GameDAO {

    @Inject
    private EntityManager em;

    public Player findById(Long id) {
        return em.find(Player.class, id);
    }

    public Player findByName(String name) {
        try {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<Player> criteria = cb.createQuery(Player.class);
            Root<Player> player = criteria.from(Player.class);
            criteria.select(player).where(cb.equal(player.get("name"), name));
            return em.createQuery(criteria).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public Question getQuestionForNewPlayer() {
        return randomEntity(em, Question.class);
    }

    //taken from https://stackoverflow.com/a/3343394
    public <T> T randomEntity(EntityManager em, Class<T> clazz) {
        Query countQuery = em.createQuery("select count(id) from " + clazz.getName());
        long count = (Long) countQuery.getSingleResult();
        if (count == 0) {
            throw new IllegalStateException("No questions found in database!");
        }
        Random random = new Random();
        int number = random.nextInt((int) count);

        Query selectQuery = em.createQuery("from " + clazz.getName());
        selectQuery.setFirstResult(number);
        selectQuery.setMaxResults(1);
        return (T) selectQuery.getSingleResult();
    }

    public static final String GET_NEXT_QUESTIONS_COUNT_QUERY = "SELECT count(q) FROM Question q WHERE q NOT IN " +
            "(SELECT p.question from PlayerAnswerState p where p.player = :player)";
    public static final String GET_NEXT_QUESTION_QUERY = "SELECT q FROM Question q WHERE q NOT IN " +
            "(SELECT p.question from PlayerAnswerState p where p.player = :player)";

    //setTimeout
    public static final String SET_QUESTIONS_TIMEOUT = "UPDATE  Question q SET q.timeout = :timeout";

    public Question getNextQuestion(Player player) {
        Query countQuery = em.createQuery(GET_NEXT_QUESTIONS_COUNT_QUERY)
                .setParameter("player", player);
        long count = (Long) countQuery.getSingleResult();
        if (count == 0) {
            return null;
        }
        Random random = new Random();
        int number = random.nextInt((int) count);
        TypedQuery<Question> selectQuery = em.createQuery(GET_NEXT_QUESTION_QUERY,
                Question.class).setParameter("player", player);
        selectQuery.setFirstResult(number);
        selectQuery.setMaxResults(1);
        return selectQuery.getSingleResult();
    }

    public PlayerAnswerState updateAnswerState(PlayerAnswerState playerAnswerState) {
        return em.merge(playerAnswerState);
    }

    public void addPlayersAnswer(PlayerAnswerState playerAnswerState) {
        em.persist(playerAnswerState);
    }

    public void persistAnswer(PlayerAnswerState playerAnswer) {
        em.persist(playerAnswer);
    }

    public void addPlayer(Player player) {
        em.persist(player);
    }

    public Player updatePlayer(Player player) {
        return em.merge(player);
    }

    //
    public void addQuestion(Question question) {
        em.persist(question);
    }

    public void addQuestions(Collection<Question> questions) {
        for (Question question : questions) {
            addQuestion(question);
        }
    }
     public void addRule(Rule rule) {

        String query = "select count(r.id) from Rule r";
        String query1 = "select r.id from Rule r";
        Long count = (Long) em.createQuery(query).getSingleResult();
        if (!(count.equals(0L)) == true) {
            Long id = (Long) em.createQuery(query1).getSingleResult();
            Rule r = em.find(Rule.class, id);
            em.remove(r);
            em.merge(rule);
        } else {
            em.merge(rule);
        }
    }

    public void addRules(List<Rule> rules) {
        addRule(rules.get(rules.size() - 1));
    }
    public Rule getRule (){
        Query query = em.createQuery("FROM Rule");
        return (Rule) query.getSingleResult();
    }

    public String getAnswers(){
        String result = "";
        Query query = em.createQuery("FROM PlayerAnswerState");
        List<PlayerAnswerState> answers = new ArrayList<PlayerAnswerState>();
        answers = query.getResultList();
        for (PlayerAnswerState answer: answers) {
            result = result + answer.toShortString();
        }
        return  result;
    }

    public void checkAnswer(long id,int correct){
        String sQuery = "Update PlayerAnswerState Set checkedIsCorrect = :correct where id = :id";
        Query query = em.createQuery(sQuery).setParameter("id", id)
                .setParameter("correct", correct);
        query.executeUpdate();}

        public void setQuizTimeout(long timeout){
        Query selectQuery = em.createQuery(SET_QUESTIONS_TIMEOUT);
        selectQuery.setParameter("timeout", timeout);
        selectQuery.executeUpdate();
    }
}
