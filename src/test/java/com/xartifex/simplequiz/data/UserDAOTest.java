package com.xartifex.simplequiz.data;

import com.xartifex.simplequiz.user.Roles;
import com.xartifex.simplequiz.user.User;
import com.xartifex.simplequiz.user.UserDAO;
import com.xartifex.simplequiz.user.UserInfo;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.inject.Inject;
import javax.transaction.NotSupportedException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;

@RunWith(Arquillian.class)
public class UserDAOTest {

    private static String TEST_USERNAME = "John Smith";
    private static String TEST_EMAIL = "john.smith@email.com";
    private static final UserInfo TEST_USER_INFO = new UserInfo(TEST_USERNAME, TEST_EMAIL);

    @Inject
    UserDAO userDAO;

    @Inject
    UserTransaction utx;

    @Deployment
    public static Archive<?> createTestArchive() {
        return ShrinkWrap
                .create(WebArchive.class, "data-test.war")
                .addPackage("com.xartifex.simplequiz.user")
                .addPackage("com.xartifex.simplequiz.common")
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
    @InSequence(1)
    public void addUserTest() throws Exception {
        User user = userDAO.addUser(TEST_USER_INFO);
        Assert.assertEquals(TEST_USERNAME, user.getUsername());
        Assert.assertEquals(TEST_EMAIL, user.getEmail());
        Assert.assertEquals(Roles.PLAYERS, Roles.PLAYERS);
    }

    @Test
    @InSequence(2)
    public void findByEmailTest() throws Exception {
        User user = userDAO.findByEmail(TEST_EMAIL);
        Assert.assertEquals(TEST_USERNAME, user.getUsername());
        Assert.assertEquals(TEST_EMAIL, user.getEmail());
    }
}