begin;

create table participants(
    p_id    int64   not null primary key,
    c_id    int64   not null references clinicians(c_id)
);

create table clinicians(
    c_id    int64   not null primary key
);

create table participant_tests(
    p_id    int64   not null references participants(p_id),
    t_id    serial  not null,
    c_id    int64   not null, references clinican(c_id),
    primary Key (p_id, c_id, t_id)
)

create table dot_cancellation(
    t_id        int64   not null references participant_tests(p_id),
    time_taken  int64   not null ,
    true_pos    int64   not null,
    false_pos   int64   not null,
    false_neg   int64   not null,
    check(false_pos > -1),
    check(false_neg > -1),
    check(true_pos > -1),
    check(time_taken < 901)
);

create table car_directions(
    t_id        int64   not null references participant_tests(p_id),
    time_taken  int64   not null,
    points      int64   not null,
    check(points > -1),
    check(points < 33)
);

create table compass_directions(
    t_id        int64   not null references participant_tests(p_id),
    time_taken  int64   not null,
    points      int64   not null,
    check(points > -1),
    check(points < 33)
);

create table road_scenarios(
    t_id        int64   not null references participant_tests(p_id),
    time_take   int64   not null,
    points      int64,
    check(points < 13)
);

create table trail_making(
    t_id        int64   not null references participant_tests(p_id),
    time_taken  int64   not null,
    mistakes    int64   not null,
);

create table test_results(
    t_id        int64 not null references participant_tests(t_id),
    p_id        int64 not null references participants(p_id),
    c_id        int64 not null references clinicians(c_id),
);



create table algorithms_names(
    a_id        int64 not null primary key,
    string      text  not null unique,
);

create table test_interactions(
    t_id        int64   not null references participant_tests(p_id),
    interaciton jsonb   not null
);

create table 


commit;