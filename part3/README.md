# Part 3: Database i container

I denne seksjonen skal vi lære hvordan vi kjører en database i en container. Dette er et typisk bruksområdet for containerteknologi fordi det gjør det enkelt å spinne opp en versjon av prod databasen lokalt. 

Vi bruker PostgreSQL som eksempel. Dette er en mye brukt FOSS (Free and Open Source Software) database.

For å bygge Postgres bruker vi en enkel Dockerfile. Den henter det offisielle Postgres image'et fra Docker Hub, setter passord og navn på databasen, kopierer inn et lite init skript, også eksponerer porten Postgres kommuniserer over.

Init skriptet lager en enkel tabell for å lagre todos og setter inn én rad.

## Oppgave

1. Bygg en Postgres container 
2. Opprett shell aksess 
3. Utfør noen SQL kommandoer mot databasen

### Bygg databasen
Bytt til mappa med Dockerfile'en i

`cd part3`

Bygg Postgres image med tag: todo

`podman build -t todo .`

### Opprett shell aksess

`podman run -d -p 5432:5432 todo`

Gi containeren et navn med --name flagget, eller bruk hashen som returneres fra podman run, eller finn det auto-genererte navnet med:

`podman ps`

Få shell access i en kjørende container

`podman exec -it <navn/hash> /bin/bash`

### Utfør SQL kommandoer

Logg på databasen med psql, et management verktøy som følger med Postgres.

`psql -U postgres -d todo`

Kjør SQL spørringer, f.eks.

`select * from todo;`

## Nyttige kommandoer

`podman run -d -p 5432:5432 todo`

Gi containeren et navn med --name flagget, eller bruk hashen som returneres fra podman run, eller finn det auto-genererte navnet med:

`podman ps`

Få shell access i en kjørende container

`podman exec -it <navn/hash> /bin/bash`

!NB bash er ikke alltid tilgjengelig i en container. Hvis man vil ha shell access i en container basert på Alpine Linux må man bruke /bin/ash
