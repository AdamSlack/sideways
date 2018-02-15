
begin;
----------------------------------------------------
--  Clinician And Participant Information
--  
----------------------------------------------------

-----
--  Example: participant_id: 12345
-----
create table participants(
    participant_id  serial   primary key  not null 
);

-----
--  Example: clinician_id: 54321
-----
create table clinicians(
    clinician_id    serial   primary key  not null,
    email 	    text     not null,
    hash	    text     not null,
    salt 	    text     not null

);


----------------------------------------------------
-- Localisation Presets
--
----------------------------------------------------

-----
--  Example: preset_name: 'en_gb'
-----
create table localisation_presets(
    preset_name                 text    not null primary key
);

create table sdsa_test_types(
    id          serial not null primary key,
    name        text   not null
);

create table sdsa_test_details(
    preset_name                 text    references localisation_presets(preset_name),
    sdsa_test_type              int     references sdsa_test_types(id),
    name                        text    ,
    instructions                text    ,
    headings_label              text    ,
    deck_label                  text    ,
    primary key (preset_name, sdsa_test_type)
);

create table trail_making_details(
    preset_name                 text    primary key references localisation_presets(preset_name),
    name                        text    ,
    instructions                text    ,
    trail_a                     text[]  ,
    trail_b                     text[]
);

create table localisation_images(
    image_id        serial  primary key,
    image           bytea   not null,
    file_type       text
);

create table road_sign_scenarios(
    road_sign_id    serial  not null primary key,
    preset_name     text    references localisation_presets(preset_name),
    sign_image      text   ,
    scene_image     text   ,
    sign_file_type  text  ,
    scene_file_type text  ,
    xpos            int     ,     
    ypos            int     
);


-----
--  Example: test_id: 1111, participant_id: 12345, clinician_id: 54321
-----
create table participant_tests(
    test_id         serial      primary key  not null,
    participant_id  smallint    references participants(participant_id)  not null,
    clinician_id    smallint    references clinicians(clinician_id) not null,
    preset_name     text        references localisation_presets(preset_name) not null,
    test_date       date
);

----------------------------------------------------
--  Test Result Information
--
----------------------------------------------------

-----
--  Example: test_id: 1111, time_taken: 900, true_pos: 12, false_pos: 13, false_neg: 15
-----
create table dot_cancellation(
    test_id     serial     references participant_tests(test_id) primary key  not null,
    time_taken  smallint   not null,
    true_pos    smallint   not null,
    false_pos   smallint   not null,
    false_neg   smallint   not null,
    test_date   date       not null
);

create table car_directions(
    test_id     serial     references participant_tests(test_id)  primary key  not null,
    time_taken  smallint   not null,
    points      smallint   not null,
    test_date   date       not null
);

create table compass_directions(
    test_id     serial references participant_tests(test_id)  primary key  not null ,
    time_taken  smallint   not null,
    points      smallint   not null,
    test_date   date       not null
);

create table road_scenarios(
    test_id     serial  references participant_tests(test_id) primary key  not null,
    time_taken  smallint   not null,
    points      smallint   not null,
    test_date   date       not null
);

create table trail_making(
    test_id     serial references participant_tests(test_id)  primary key  not null ,
    time_taken  smallint   not null,
    mistakes    smallint   not null,
    test_date   date       not null
);


----------------------------------------------------
--  Test Interaction Recordings
--
----------------------------------------------------

-----
--  Example: test_id: 1111, interaction: {dot_cancellation: [{type: 'mouse_down', x: 123, y: 321}, {type: 'mouse_move', x: 124, y: 322}]}
-----
create table test_interactions(
    test_id      serial  references participant_tests(test_id) not null ,
    test_type    int     references sdsa_test_types(id) not null,
    interaction  text   not null,
    primary key (test_id, test_type)
);

----------------------------------------------------
--  Results for the 
--
----------------------------------------------------

-----
--  Example: algorithm_id: 2222, clinician_id: 54321, algorithm_name: 'SDSA'
-----
create table algorithm(
    algorithm_id    serial  primary key not null,
   -- clinician_id    smallint references clinicians(clinician_id)  not null, 
    algorithm_name  text   not null
);

-----
--  Example: test_id: 1111, algorithm_id: 2222, results: {recommendation_score: -0.004, probability: 0.005, recommend: 'No'}
-----
create table algorithm_results(
    test_id         serial              primary key not null,
    algorithm_id    smallint            references algorithm(algorithm_id) not null,
    r1 		        double precision,
    r2 		        double precision,
    passed 	        boolean,
    result_json     jsonb
);

----
--  TEST Clinician. Doesn't do anything though.
----
insert into clinicians (email, hash, salt) values ('clinician@sdsa.com', 'jPMS7SVKdcafJPLNokrc0WTXjYyaAoggRR/7LhcPotdsV3Nv5BsXOtPUbw+bGKpo+qnfzhldcGKSuEtqFJKj6w==', 'hello');

----
--  Initial algorithm
----
insert into algorithm (algorithm_name) values ('SDSA'); 	--1
insert into algorithm (algorithm_name) values ('SDSA hard'); 	--2
----
--  Initial SDSA test types.
----
insert into sdsa_test_types (name) values ('dot_cancellation');     -- 1
insert into sdsa_test_types (name) values ('compass_directions');   -- 2
insert into sdsa_test_types (name) values ('car_directions');       -- 3
insert into sdsa_test_types (name) values ('road_sign_scenarios');  -- 4
insert into sdsa_test_types (name) values ('trail_making');         -- 5
----
--  Initial SDSA localisation preset details
----
insert into localisation_presets (preset_name) values ('test');

insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions) values ('test', 1, 'Dot Cancellation Test', 'Here be instructions for the dot cancellation test.');
insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions, headings_label, deck_label) values ('test', 2, 'Compass Directions Test', 'Here be instructions for the dot cancellation test.', 'Headings label...', 'Deck Label...');
insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions, headings_label, deck_label) values ('test', 3, 'Car Directions Test', 'Here be instructions for the dot cancellation test.', 'Headings label...', 'Deck Label...');
insert into sdsa_test_details (preset_name, sdsa_test_type, name, instructions) values ('test', 4, 'Road Sign Scenarios', 'Here be instructions for Road Sign Scenarios.');
insert into trail_making_details(preset_name, name, instructions, trail_a, trail_b) values ('test', 'Trail Making Test', 'Connect the Dots and shizzle', array['1','2','3','4','5','6'], array['a','1','b','2','c','3']);

----
--  Road Rign Scenario Test: Some test Scenarios. 1-5
----
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign1', 'roadScenarios/test/Scene1');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign2', 'roadScenarios/test/Scene2');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign3', 'roadScenarios/test/Scene3');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign4', 'roadScenarios/test/Scene4');

insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign5', 'roadScenarios/test/Scene5');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign6', 'roadScenarios/test/Scene6');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign7', 'roadScenarios/test/Scene7');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign8', 'roadScenarios/test/Scene8');

insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign9', 'roadScenarios/test/Scene9');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign10', 'roadScenarios/test/Scene10');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign11', 'roadScenarios/test/Scene11');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign12', 'roadScenarios/test/Scene12');

insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign13', 'roadScenarios/test/Scene13');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign14', 'roadScenarios/test/Scene14');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign15', 'roadScenarios/test/Scene15');
insert into road_sign_scenarios (preset_name,xpos,ypos,sign_file_type,scene_file_type, sign_image, scene_image) values ( 'test', 1,1,'png','png', 'roadSigns/test/Sign16', 'roadScenarios/test/Scene16');

----
--  Test participant and particiant-test data.
----
insert into participants (participant_id) values (1) on conflict do nothing;
insert into participant_tests (test_id, participant_id, clinician_id, preset_name) values (1, 1,1,'test') on conflict do nothing;

----
--  Dot Cancellation Test Results
----
insert into dot_cancellation (test_id, time_taken, true_pos, false_pos, false_neg, test_date)
    values (1,123,12,34,56,NOW()) on conflict do nothing;

----
--  Compass Direction Test Results
----
insert into compass_directions (test_id, time_taken, points, test_date)
    values (1,123,13,NOW()) on conflict do nothing;

----
--  Car Direction Test Results
----
insert into car_directions (test_id, time_taken, points, test_date)
    values (1,321,31,NOW()) on conflict do nothing;

----
--  Road Sign Scenario test results
----

insert into road_scenarios (test_id, time_taken, points, test_date)
    values (1,222,333,NOW()) on conflict do nothing;

----
--  Trail Making
----
insert into trail_making (test_id, time_taken, mistakes, test_date)
    values (1,999,4,NOW()) on conflict do nothing;


----
--  Test interaction logs data.
----

insert into test_interactions (test_id, test_type, interaction) values (1,1,'{message: "This is a Test log for the dot cancellation test"}');
insert into test_interactions (test_id, test_type, interaction) values (1,2,'{message: "This is a Test log for the Compass Test"}');
insert into test_interactions (test_id, test_type, interaction) values (1,3,'{message: "This is a Test log for the Car Directions test"}');
insert into test_interactions (test_id, test_type, interaction) values (1,4,'{message: "This is a Test log for the Road Signs Test"}');
insert into test_interactions (test_id, test_type, interaction) values (1,5,'{message: "This is a Test log for the Trail Making Test"}');


-- CREATE USER sdsa_user WITH PASSWORD 'password';
-- REVOKE ALL ON SCHEMA public FROM sdsa_user;
--  REVOKE ALL ON SCHEMA public FROM sdsa_user;
--  REVOKE ALL ON SCHEMA public FROM sdsa_user;

commit;
