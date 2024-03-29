drop table if exists household.dashboard_setting_args;
drop table if exists household.dashboard_setting;

create table household.dashboard_setting(
    id varchar(26) not null primary key,
    feature  varchar(32) not null,
    "order" integer not null,
    user_id varchar(26) not null references public.user(id),
    group_id varchar(26) not null references public.group(id)
);

create table household.dashboard_setting_args(
    id varchar(26) not null primary key,
    setting_id varchar(26) not null references household.dashboard_setting(id) ,
    type varchar(32) not null,
    value varchar(32) not null
);

create table household.favorite_filter(
    id varchar(26) not null primary key,
    name varchar(64) not null,
    group_id varchar(26) not null references public.group(id)
);

create table household.favorite_filter_args(
    id varchar(26) not null primary key,
    filter_id varchar(26) not null references household.favorite_filter(id),
    key varchar(32) not null,
    value varchar(32) not null
);
