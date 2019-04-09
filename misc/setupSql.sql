//todo: id genration must be fixed
insert into roles (id, role) values (400001, 'admins');
insert into roles (id, role) values (400002, 'players');
insert into users (id, email, password, username, office, rusname) values (300991, 'admin@email.com', 'OgJj5Z45bLeKEP19pHiXSdCFjtyDUhq3XzWaQct5KIbxBBiJ2EvJ', 'admin','','');
insert into users_roles (user_id, role_id) values (300991, 400001);
insert into rule (id, rule ) values (400003, 'Quiz consists of 10 questions')