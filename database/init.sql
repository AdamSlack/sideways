
begin;
----------------------------------------------------
--  Clinician And Participant Information
--  
----------------------------------------------------

-----
--  Example: participant_id: 12345
-----
create table participants(
    participant_id  serial primary key  not null 
);

-----
--  Example: clinician_id: 54321
-----
create table clinicians(
    clinician_id    serial   primary key  not null
);

-----
--  Example: test_id: 1111, participant_id: 12345, clinician_id: 54321
-----
create table participant_tests(
    test_id         serial  primary key  not null,
    participant_id  smallint   references participants(participant_id)  not null,
    clinician_id    smallint    references clinicians(clinician_id) not null
);

----------------------------------------------------
--  Test Result Information
--
----------------------------------------------------

-----
--  Example: test_id: 1111, time_taken: 900, true_pos: 12, false_pos: 13, false_neg: 15
-----
create table dot_cancellation(
    test_id     serial  references participant_tests(test_id) primary key  not null,
    time_taken  smallint   not null,
    true_pos    smallint   not null,
    false_pos   smallint   not null,
    false_neg   smallint   not null
);

create table car_directions(
    test_id     serial  references participant_tests(test_id)  primary key  not null,
    time_taken  smallint   not null,
    points      smallint   not null
);

create table compass_directions(
    test_id     serial references participant_tests(test_id)  primary key  not null ,
    time_taken  smallint   not null,
    points      smallint   not null
);

create table road_scenarios(
    test_id     serial  references participant_tests(test_id) primary key  not null,
    time_take   smallint   not null,
    points      smallint   not null
);

create table trail_making(
    test_id     serial references participant_tests(test_id)  primary key  not null ,
    time_taken  smallint   not null,
    mistakes    smallint   not null
);

----------------------------------------------------
-- Localisation Presets
--
----------------------------------------------------

-----
--  Example: preset_id: 0001, region: en-gb, localisation: { dot_cancellation: {instructions: 'fooo baar'}}
-----
create table localisation_presets(
    preset_id       serial  primary key  not null,
    region          text    not null,
    localisation    jsonb   not null
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
-- ----------------------------------------------------

-- -----
-- --  Example: algorithm_id: 2222, clinician_id: 54321, algorithm_name: 'SDSA'
-- -----
-- create table algorithms(
--     algorithm_id    serial  primary key not null,
--     clinician_id    smallint references clinicians(clinician_id)  not null,
--     algorithm_name  text   not null
-- )

-- -----
-- --  Example: test_id: 1111, algorithm_id: 2222, results: {recommendation_score: -0.004, probability: 0.005, recommend: 'No'}
-- -----
-- create table algorithm_results(
--     test_id         serial,
--     algorthim_id    smallint references algorithms(algorithm_id) not null,
--     results         jsonb,
--     primary key(test_id)
-- );

commit;