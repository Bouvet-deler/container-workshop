create table todo (
        id serial primary key,
        message text,
        completed boolean not null
    );

insert into todo(message, completed) values ('Boring task zzz', '0');