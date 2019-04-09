package com.xartifex.simplequiz.user;

import org.slf4j.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.*;
import java.util.Arrays;

@ApplicationScoped
public class PredefinedRolesCreator {

    @PersistenceContext
    private EntityManager em;

    @Inject
    Logger log;

    @Inject
    UserTransaction utx;

    //todo: do we need to call rollback in case of an error?
    //currently disabled
    public void prepareRoles(
            /*@Observes @Initialized(ApplicationScoped.class)*/
            final Object event) throws SystemException, NotSupportedException, HeuristicRollbackException, HeuristicMixedException, RollbackException {
        utx.begin();
        em.merge(Roles.ADMINS);
        em.merge(Roles.PLAYERS);

        //todo: remove this
        User user = new User();
        user.setUsername("admin");
        user.setEmail("admin@email.com");
        user.setPassword("admin");
        Role admin = em.merge(Roles.ADMINS);
        user.setRoles(Arrays.asList(admin));
        em.merge(user);

        log.info("Roles have been added: " + Roles.PLAYERS + " " + Roles.ADMINS);

        utx.commit();
    }
}
