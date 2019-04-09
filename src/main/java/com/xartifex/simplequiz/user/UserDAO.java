package com.xartifex.simplequiz.user;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Arrays;
import java.util.Set;

@ApplicationScoped
public class UserDAO implements UserInfoProvider{

    //хоть что-то у нас в безорасноти
    public static final String DEFAULT_PASSWORD = "1";

    @Inject
    private EntityManager em;

    public User findByEmail(String email) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> criteria = cb.createQuery(User.class);
        Root<User> user = criteria.from(User.class);
        criteria.select(user).where(cb.equal(user.get("email"), email));
        return em.createQuery(criteria).getSingleResult();
    }

    @Override
    public UserInfo getUserInfoByEmail(String email) {
        User user = findByEmail(email);
        UserInfo userInfo = new UserInfo(user.getUsername(), user.getRusName(), user.getEmail(), user.getOffice());
        return userInfo;
    }

    public User addUser(UserInfo userInfo) {
        Role playersRole = em.merge(Roles.PLAYERS);
        User user = new User();
        user.setUsername(userInfo.getName());
        user.setRusName(userInfo.getRusName());
        user.setOffice(userInfo.getOffice());
        user.setEmail(userInfo.getEmail());
        user.setPassword(DEFAULT_PASSWORD);
        user.setRoles(Arrays.asList(playersRole));
        em.persist(user);
        return user;
    }

    public void addUsers(Set<UserInfo> users) {
        for(UserInfo userInfo: users) {
            addUser(userInfo);
        }
    }

    public void addAdmin(UserInfo userInfo) {
        //todo: read from a file defined by system property
    }
}
