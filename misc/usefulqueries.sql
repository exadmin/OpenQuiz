--delete all game data
delete from playeranswerstate;
delete from player_playeranswerstate;
delete from player;
delete from question;
delete from users_roles where user_id != 300991;
delete from users where email != 'admin@email.com';

--show all users with their results, even those who didn't play at all
select rownum(), email, office, total from (
select email, office, sum(points) total  from (
select email, office,  (case iscorrect when 'true' then 1 else 0 end) points
    from playeranswerstate a
    right join player p on a.player = p.id and iscorrect='true'
    right join users u on u.email = p.name)
group by email order by total desc)

--show players results
select rownum(), email, office, total from (
select email, office, sum(points) total  from (
select email, office,  (case iscorrect when 'true' then 1 else 0 end) points
    from playeranswerstate a
    right join player p on a.player = p.id and iscorrect='true'
    join users u on u.email = p.name)
group by email order by total desc)

