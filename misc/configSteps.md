# Game server setup:
0. install wildfly wildfly-10.1.0.Final (${wildfly home} = JBOSS_HOME)
1. set `JBOSS_HOME=<path to wildfly-10.1.0.Final installation>`
2. start wildfly server with `standalone.bat -b 0.0.0.0 -Djboss.http.port=80`
3. execute [configure-server.cli](configure-server.cli) in ${wildfly home}/bin:
    `jboss-cli.bat --connect --file=<path to file>/configure-server.cli`
4. copy [com](com) folder to ${wildfly home}/modules
5. replace index.html in ${wildfly home}/welcome-content to [index.html](index.html)
6. install h2console by placing [h2console.war](h2console.war) to ${wildfly home}/standalone/deployments folder
7. reboot the server
8. `mvn package`
9. copy target/simpleQuiz.war to  ${wildfly home}/standalone/deployments folder
10. go to [localhost/h2console](localhost/h2console) and login to app db:  
    `Saved Settings: Generic H2 (Server)`  
    `Driver Class: org.h2.Driver`  
    `JDBC URL: jdbc:h2:file:./data/prod`  
    `User Name: sa`  
    `Password: ${pass}`  
11. execute content of [setupSql.sql](setupSql.sql) (_admin user is added at this point_)
12. go to [localhost/simpleQuiz/admin.html](localhost/simpleQuiz/admin.html):  
    `User Name: admin@email.com`  
    `Password: OgJj5Z45bLeKEP19pHiXSdCFjtyDUhq3XzWaQct5KIbxBBiJ2EvJ`  
13. press two _Submit Query_ buttons to add sample questions and players to the game
14. go to [localhost](localhost) and enter one of the the sample emails
15. play the game