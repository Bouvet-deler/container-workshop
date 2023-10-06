# Database i container

Vi bruker PostgreSQL som eksempel. Dette er en mye brukt og moden FOSS (Free and Open Source Software) database.

## Nyttige kommandoer

For å få shell inn i en kjørende container med postgres

`podman run -it -e POSTGRES_PASSWORD=pass postgres /bin/bash`

Denne antar at du er i samme mappe som Dockerfile. Siste argument er path til mappa med Dockerfile, eller så kan du gi Dockerfile-ene navn og angi path med -f flagget.

`podman build -t todo .`

`podman run -d -p 5432:5432 todo`

Gi containeren et navn med --name flagget, eller bruk hashen som returneres fra podman run, eller finn det auto-genererte navnet med:

`podman ps`

Få shell access i en kjørende container

`podman exec -it <navn/hash> /bin/bash`

!NB bash er ikke alltid tilgjengelig i en container. Hvis man vil ha shell access i en container basert på Alpine Linux må man bruke /bin/ash