# Part 3: Database i container

I denne seksjonen skal vi lære hvordan vi kjører en database i en container. Dette er et typisk bruksområdet for containerteknologi fordi det gjør det enkelt å spinne opp en versjon av prod databasen lokalt. 

Vi bruker PostgreSQL som eksempel. Dette er en mye brukt FOSS (Free and Open Source Software) database.

For å bygge Postgres bruker vi en enkel Dockerfile. Den henter det offisielle Postgres image'et fra Docker Hub, setter passord og navn på databasen, kopierer inn et lite init skript, også eksponerer porten Postgres kommuniserer over.

Init skriptet lager en enkel tabell for å lagre todos og setter inn én rad.


## Oppgave

1. [Bygg en Postgres container](#bygg-databasen)
2. [Opprett shell aksess](#opprett-shell-aksess)
3. [Test SQL kommandoer](#test-sql-kommandoer)

### Bygg databasen

Bestem hva du skal tagge database-containeren med (feks `db`). Dette bruker du istedenfor `<tagname>` i kommandoene under.

1. Bytt til mappen med Dockerfile'en  er i: `cd part3`
2. `podman build -t <tagname> .`

### Opprett shell aksess

Når man kjører opp en container kan man gi den et navn med `--name` flagget. Alternativt kan man bruke hashen som returneres fra `podman run` eller finne det auto-genererte navnet med `podman ps`.

1. Spinn opp containeren:<br/>`podman run -d --rm -p 5432:5432 <tagname>` / `podman run -d --rm -p 5432:5432 --name <name> <tagname>`

`-d` flagget spinner opp containeren i _detached_ tilstand. Det vil si at du den kjører i bakdrunnen mens du returneres til terminalen.

2. Få shell access i en kjørende container<br/>`podman exec -it <navn/hash> /bin/bash`

NB! `bash` er ikke alltid tilgjengelig i en container. Hvis man vil ha shell access i en container basert på Alpine Linux må man bruke `/bin/ash`.

### Test SQL kommandoer

1. Logg på databasen med psql, et management verktøy som følger med Postgres.<br/>`psql -U postgres -d todo`

2. Kjør SQL spørringer, f.eks. `select * from todo;`

**OBS:** Semikolonet må bli med for å avslutte kommandoen i terminalen.

3. Avslutt `psql` med `exit` og gå ut av containeren med `exit` en gang til.

## Nyttige kommandoer

| Kommando | Forklaring |
| --- | --- |
| `podman ps` | List kjørende containere |
| `podman ps -a` | List alle containere |
| `podman exec -it <navn/hash> /bin/bash` | Få shell access i en kjørende container<br/>**NB!** bash er ikke alltid tilgjengelig i en container. Hvis man vil ha shell access i en container basert på Alpine Linux må man bruke `/bin/ash` |

