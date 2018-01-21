
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
    preset_name     text    references localisation_presets(preset_name),
    image           bytea   not null,
    file_type       text
);

create table road_sign_scenario(
    road_sign_id    serial  not null primary key,
    sign_id         int     references localisation_images(image_id),
    scenario_id     int     references localisation_images(image_id),
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
    preset_name     text        references localisation_presets(preset_name) not null
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
    time_take   smallint   not null,
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
    test_id      serial  references participant_tests(test_id) primary key not null ,
    interaction  jsonb   not null
);

----------------------------------------------------
--  Results for the 
--
----------------------------------------------------

-----
--  Example: algorithm_id: 2222, clinician_id: 54321, algorithm_name: 'SDSA'
-----
create table algorithms(
    algorithm_id    serial  primary key not null,
    clinician_id    smallint references clinicians(clinician_id)  not null,
    algorithm_name  text   not null
);

-----
--  Example: test_id: 1111, algorithm_id: 2222, results: {recommendation_score: -0.004, probability: 0.005, recommend: 'No'}
-----
create table algorithm_results(
    test_id         serial primary key not null,
    algorthim_id    smallint references algorithms(algorithm_id) not null,
    results         jsonb
);

----
--  TEST Clinician. Doesn't do anything though.
----
insert into clinicians (email, hash, salt) values ('clinician@sdsa.com', 'jPMS7SVKdcafJPLNokrc0WTXjYyaAoggRR/7LhcPotdsV3Nv5BsXOtPUbw+bGKpo+qnfzhldcGKSuEtqFJKj6w==', 'hello');

----
--  Initial SDSA test types.
----
insert into sdsa_test_types (name) values ('dot_cancellation');     -- 1
insert into sdsa_test_types (name) values ('compass_directions');   -- 2
insert into sdsa_test_types (name) values ('car_directions');       -- 3
insert into sdsa_test_types (name) values ('road_sign_scenarios');  -- 4
insert into sdsa_test_types (name) values ('trail_making');         -- 5

commit;
