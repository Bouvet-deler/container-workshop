create table todo (
        id serial primary key,
        message text,
        checked boolean not null
    );

insert into todo(message, checked) values ('Boring task zzz', '0');