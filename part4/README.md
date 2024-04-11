# Part 4

I denne seksjonen skal vi spinne opp en Svelte-applikasjon og en database i hver sin container og få dem til å snakke sammen over et nettverk.

## 4.1 Bygge applikasjonen

Naviger til  mappen med programmet: `cd part4/dotnet-docker`. Se [Dockerfil](./svelte-frontend/Dockerfile) for bygginstruksjoner.

Bestem deg for en tag å bruke på applikasjonen, for eksempel `svelte`.

```bash
podman build . -t <tagname>:latest
```

`.` er filstien til dockerfilen. Her antar vi at du kjører kommandoen fra roten av prosjektet (`svelte-frontend/.`).

Observer [`.dockerignore`](./svelte-frontend/.dockerignore)-filen i `svelte-frontend`-mappen. Denne filen brukes for å ekskludere filer og mapper fra bygg-konteksten. Ved å unngå å sende unødvendige filer til bygg-konteksten får vi en raskere bygg-prosess.

## 4.2 Kjøre applikasjonen

```bash
podman run -d -p 5000:5000 <tagname>:latest
```

`-p` flagget mapper port 5000 på containeren til port 5000 for hosten.

Hosten er definert til å eksponeres i `package.json`, så nå kan vi nå den på http://localhost:5000.

## 4.3 Bygge databasen

Se [del 3](../part3/README.md#bygg-databasen). Foreslått tag: `db` or `pg-db`.

## 4.4 Kjøre databasen

```bash
podman run -d -e POSTGRES_PASSWORD=pass -p 5432:5432 <tagname>
```

## 4.5 Konfigurere applikasjonen til å bruke databasen

Vi annbefaler å kjøre `npm install` etterfulgt av `npm run dev`. Dette starter programmet i utviklingsmodus. Da får vi en utviklingsserver som automatisk laster programmet på nytt når det gjøres endringer. Dette vil gjøre det lettere å teste og debugge endringene.

Nå som både programmet og databasen kjører skal vi få dem til å kommunisere.

Først må vi fullføre programmet ved å legge til en måte å hente data fra databasen. Den anbefalte metoden er å kjøre programmet lokalt med en PostgreSQL-instans kjørende i en container. Vi utnytter SvelteKit's server-side rendering til å hente data fra databasen og vise det på nettsiden.

Først må vi opprette en ny rute hvor vi kan vise todo'ene våre. Lag en ny fil kalt `/routes/todo/+page.svelte` og legg til følgende kode:

```html
<script lang="ts">
  import type { LoadReturnType } from './+page.server';

  export let data: LoadReturnType;
</script>

<h1>Todo</h1>

<!-- Will display data from the database -->
<pre>{JSON.stringify(data, null, 2)}</pre>
```

Legg til en annen fil `/routes/todo/+page.server.ts`:

```typescript
import pgPromise from 'pg-promise';

const pgp = pgPromise({});

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'todo',
  user: 'postgres',
  password: 'pass',
});

// Will run to finish before the page is rendered for the user
export async function load() {
  try {
    const data = (await db.any('SELECT * FROM todo ORDER BY id')) as Todo[];

    // Returns must be of type object, we can either spread the result or put it in an object
    return { data };
  } catch (error) {
    console.error('ERROR:', error);
    return { errorMsg: 'Something went wrong when fetching from database' };
  }
}

// TS models and types:
type PromiseType<T> = T extends Promise<infer U> ? U : T;

export type LoadReturnType = PromiseType<ReturnType<typeof load>>;

export interface Todo {
  id: number;
  message: string;
  completed: boolean;
}
```

Etter endringene må du bygge containeren med programmet på nytt.

Nå kan vi gå til http://localhost:5000/todo og se at siden _prøver_ å hente data fra databasen. Vi skal hjelpe den.

Hvis du har problemer med å få den til å kjøre er det bare å spørre om hjelp eller se løsningsforslaget på `part4-solution-example`-branchen.

### Dokumentasjon

SvelteKit routing (+server) https://kit.svelte.dev/docs/routing#server

SvelteKit server side modules: https://kit.svelte.dev/docs/server-only-modules

## 4.6 Lage et nettverk mellom containerne

```bash
podman network create todonet
```

Dette vil opprette et nettverk kalt `todonet`.

### Kjøre containerne på samme nett

Vi starter med å spinne opp databbasen:

```bash
podman run -d --network todonet <tagname til db>
```

Observer at vi ikke bruker `-p`-flagget. Vi trenger ikke eksponere porten til containeren videre til verten ettersom programmet vil kommunisere med databasen over nettverket vi har laget.

Så spinner vi opp resten av programmet:

```bash
podman run -d --network todonet -p 5000:5000 <tagname til app>:latest
```

Her må vi bruke `-p`-flagget for å eksponere port 5000 til verten slik at vi kan nå programmet fra nettleseren.

### Problem: Svelte-applikasjonen klarer ikke å nå databasen

Fordi front-enden er konfigurert til å nå databasen på `localhost` må vi endre konfigurasjonen. Vi kan finne IP-adressen eller ID til databasecontaineren ved å kjøre `podman inspect <CONTAINERID/NAME>`. Det er imidlertid ikke smart å bruke denne disse verdiene da de kan endres når containeren restarter.

Vi kan heller bruke navnet til containeren. Fordelen med å bruke navnet er at det er noe du kan styre selv.

```bash
# Start the DB container with a specific name
podman run --network todonet --name <navn til db container> -d <tagname til db>

# Start the FE with host environment variable pointing to the DB container
podman run --network todonet --name <navn til app container> -d -p 5000:5000 -e HOST=<navn til db container> <tagname til app>
```

Observer hvordan vi eksponerer navnet til databasecontaineren til applikasjonscontaineren via en miljøvariabel. Dette vil gjøre det lettere å gjøre endringer senere, ettersom vi ikke må endre kildekoden. Før det fungerer må vi også endre applikasjonen til å bruke miljøvariabelen:

```typescript
const host = process.env['HOST'];

const db = pgp({
  host: host,
  port: 5432,
  database: 'todo',
  user: 'postgres',
  password: 'pass',
});
```


Fin; 🥳

### Documentation

Docker networking documentation: https://docs.docker.com/network/

# Utilities

### Stop and remove all containers

`podman rm --force $(podman ps --all --quiet)`

### Remove all images

`podman rmi --force $(podman images --quiet)`

## General

Use "podman inspect CONTAINERID/NAME" to get detailed information on a running container

# Future work

### TODO app related

- Keep creating the TODO app! Add the ability to add, delete and update todos, display the todos in a better fashion, etc..
- Placeholder or loading screen while the app is loading from DB?
- Error handling?
- Add type safety between the front-end and the back-end?

### Docker/Podman related

- Create a specific Dockerfile (e.g. Dockerfile.dev) with hot reload for local development
- Multi stage builds to lower the size of the images!
- Create a Docker Compose file to start up both the DB and the application with one command, including a network!
- Health checks to automatically restart the container if it does not respond/crashes
  - Example: https://docs.docker.com/engine/reference/builder/#healthcheck
- Scale up! Run multiple instances of the application and put them behind a load balancer
- Add a volume to the DB container to persist data
- Add a volume to the FE container to persist data
