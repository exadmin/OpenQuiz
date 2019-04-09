package com.xartifex.simplequiz.rest.admin;

import com.xartifex.simplequiz.data.GameDAO;
import com.xartifex.simplequiz.model.Question;
import com.xartifex.simplequiz.user.UserDAO;
import com.xartifex.simplequiz.user.UserInfo;
import com.xartifex.simplequiz.util.Util;
import org.slf4j.Logger;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;

@RolesAllowed({"admins"})
@Path("/admin")
@Stateless
public class AdminRest {

    @Inject
    Logger log;

    @Inject
    GameDAO gameDAO;

    @Inject
    UserDAO userDAO;

    @POST
    @Path("/addQuestions")
    @Consumes("text/plain")
    @Produces("text/plain")
    public Response addQuestions(String data) {
        Collection<Question> questions = Util.getQuestions(data);
        gameDAO.addQuestions(questions);
        log.info("Questions to add: " + questions);
        return Response.status(Response.Status.OK).entity("Questions added.").build();
    }

    @POST
    @Path("/addPlayers")
    @Consumes("text/plain")
    @Produces("text/plain")
    public Response addPlayers(String data) {
        Set<UserInfo> users = Util.getUsers(data);
        userDAO.addUsers(users);
        log.info("Players to add: " + users);
        return Response.status(Response.Status.OK).entity("Users added.").build();
    }
    @POST
    @Path("/addRules")
    @Consumes("text/plain")
    @Produces("text/plain")
    public Response addRules(String data) {   
        List rules = Util.getRules(data);
        gameDAO.addRules(rules);
        log.info("Rules to add: " + rules);
        return Response.status(Response.Status.OK).entity("Rules added.").build();
    }
    
    @GET
    @Path("/rules")
    public String getRules()  {
        return gameDAO.getRule().getText();
    }

    @GET
    @Path("/check/answers")
    public String getAnswers()  {
        return gameDAO.getAnswers();
    }

    @POST
    @Path("/check/answer")
    @Consumes("text/plain")
    @Produces("text/plain")
    public Response checkAnswer(String data)  {
        StringTokenizer st = new StringTokenizer(data, "|");
        gameDAO.checkAnswer(Long.parseLong(st.nextToken()), Integer.parseInt(st.nextToken()));
        log.info("Answers checked");
        return Response.status(Response.Status.OK).entity("Answers checked.").build();
    }
    

    //set Timeout
    @POST
    @Path("/setQuizTimeout")
    @Consumes("text/plain")
    @Produces("text/plain")
    public Response setQuizTimeout(String data){
        long timeout = Util.getTimeout(data);
        gameDAO.setQuizTimeout(timeout);
        log.info("Timeout change to" + timeout);
        return Response.status(Response.Status.OK).entity("Timeout set.").build();
    }
}
