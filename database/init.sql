begin;
----------------------------------------------------
--  Clinician And Participant Information
--  
----------------------------------------------------


-----
--  Example: participant_id: 12345
-----
create table participants(
    participant_id  int64   not null primary key,
);

-----
--  Example: clinician_id: 54321
-----
create table clinicians(
    clinician_id    int64   not null primary key,
);

-----
--  Example: test_id: 1111, participant_id: 12345, clinician_id: 54321
-----
create table participant_tests(
    test_id         serial  not null primary key,
    participant_id  int64   not null references participants(participant_id),
    clinician_id    int64   not null, references clinican(clinician_id),
);

----------------------------------------------------
--  Test Result Information
--
----------------------------------------------------

-----
--  Example: test_id: 1111, time_taken: 900, true_pos: 12, false_pos: 13, false_neg: 15
-----
create table dot_cancellation(
    test_id     serial  not null references participant_tests(test_id) primary key,
    time_taken  int64   not null,
    true_pos    int64   not null,
    false_pos   int64   not null,
    false_neg   int64   not null,
);

create table car_directions(
    test_id     serial  not null references participant_tests(test_id)  primary key,
    time_taken  int64   not null,
    points      int64   not null,
);

create table compass_directions(
    test_id     serial  not null references participant_tests(test_id)  primary key,
    time_taken  int64   not null,
    points      int64   not null,
);

create table road_scenarios(
    test_id     serial  not null references participant_tests(test_id) primary key,
    time_take   int64   not null,
    points      int64,
);

create table trail_making(
    test_id     serial  not null references participant_tests(test_id)  primary key,
    time_taken  int64   not null,
    mistakes    int64   not null,
);

----------------------------------------------------
-- Localisation Presets
--
----------------------------------------------------

-----
--  Example: preset_id: 0001, region: en-gb, localisation: { dot_cancellation: {instructions: 'fooo baar'}}
-----
create table localisation_presets(
    preset_id       serial  not null primary key,
    region          text    not null,
    localisation    jsonb   not null,
);

----------------------------------------------------
--  Test Interaction Recordings
--
----------------------------------------------------

-----
--  Example: test_id: 1111, interaction: {dot_cancellation: [{type: 'mouse_down', x: 123, y: 321}, {type: 'mouse_move', x: 124, y: 322}]}
-----
create table test_interactions(
    test_id      serial  not null references participant_tests(test_id) primary key,
    interaction  jsonb   not null,
);

----------------------------------------------------
--  Results for the 
--
----------------------------------------------------

-----
--  Example: test_id: 1111, algorithm_id: 2222, results: {recommendation_score: -0.004, probability: 0.005, recommend: 'No'}
-----
create table algorithm_results(
    test_id         serial,
    algorthim_id    int64,
    results         jsonb,
    primary key(test_id)
);

-----
--  Example: algorithm_id: 2222, clinician_id: 54321, algorithm_name: 'SDSA'
-----
create table algorithms(
    algorithm_id    serial not null primary key,
    clinician_id    int64  not null references clinicians(clinician_id),
    algorithm_name  text   not null
);

commit;