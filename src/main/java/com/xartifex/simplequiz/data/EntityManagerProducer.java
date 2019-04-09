package com.xartifex.simplequiz.data;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


public class EntityManagerProducer {

    @PersistenceContext
    private EntityManager entityManager;

    @RequestScoped
    @Produces
    public EntityManager getEntityManager() {
        return entityManager;
    }
}