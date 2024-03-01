# Part 4

## 4.1 Building the FE application

Make sure you are in the right directory /part4/svelte-frontend. See the Dockerfile for the build instructions.

```bash
podman build . -t nameOfImage:latest
```

-t : tag the image with a name and a tag

. : the path to the Dockerfile (we assume your current working directory is the root of the project (svelte-frontend/.))

nameOfImage:latest : the name and tag of the image (latest is the default tag if not specified) (run 'podman images' to see the list of images on your system)
"svelte" is recommended to keep track

Take note of .dockerignore in the svelte-frontend directory. This file is used to exclude files and directories from the build context. This is useful to avoid sending unnecessary files to the build context and thus speeding up the build process.

## 4.2 Running the FE application

```bash
podman run -d -p 5000:5000 nameOfImage:latest
```

-d : run the container in the background (detached mode)

-p : map the port 5000 of the container to the port 5000 of the host

As we have set up the host to be exposed in package.json, we can now access the app at http://localhost:5000

## 4.3 Building the BE application

See part 3

## 4.4 Running the BE application

```bash
podman run -d -e POSTGRES_PASSWORD=pass -p 5432:5432 todo
```

## 4.5 Configuring the Front-End to use the Back-end

We recommend using "npm run dev" (requires having ran "npm install" first) command to start the application in development mode. This will start a development server that will automatically reload the application when changes are made. This will make it easier to test and debug our changes.

Now that the front- and back-end are up and running, we need to work on making them communicate.

First we will complete the Svelte application by adding a way to fetch data from the database. The suggested approach is to run the front end application locally, with an PostgreSQL instance running in a container. We will take advantage of SvelteKit's server-side rendering to fetch data from the database and display it in the front end.

First we will create a new route where we can display our todos. Create a new file called /routes/todo/+page.svelte and add the following code:

```html
<script lang="ts">
  import type { LoadReturnType } from './+page.server';

  export let data: LoadReturnType;
</script>

<h1>Todo</h1>

<!-- Will display data from the database -->
<pre>{JSON.stringify(data, null, 2)}</pre>
```

We will also create a new file /routes/todo/+page.server.ts

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

If we now navigate to "http://localhost:5000/todo" we should see the data from the database displayed in the browser.
If you encountered problems, do not hesitate to ask for help or checkout the solution in the part4-solution-example branch.

### Documentation

SvelteKit routing (+server) https://kit.svelte.dev/docs/routing#server

SvelteKit server side modules: https://kit.svelte.dev/docs/server-only-modules

## 4.6 Creating a network for the DB and application to communicate

```bash
podman network create todo
```

This will create a network called todo

### Running the DB and the application in the same network

The DB:

```bash
podman run -d --network todo postgres
```

Note the absence of the -p flag. We do not need to expose the port of the container to the host as the FE will be communicating with the BE through a network.

And now join the rest of the application on the same network (remember to build the image if you have done changes since last build!):

```bash
podman run -d --network todo -p 5000:5000 nameOfImage:latest
```

To be able to reach the application, we must still expose port 5000 on the host.

### Problem: The FE cannot reach the DB

Because it is configured/expecting to reach the DB at localhost, we must change configuration to reach the DB. We can find the IP of the DB container by running "podman inspect CONTAINERID/NAME" on the DB container. We can use this IP to reach the DB from the FE. This is not a good solution as the IP of the DB container can change if the container is restarted.

We can use either the container id or container name. I suggest container name as this is something we can control

```bash
# Start the DB container with a specific name
podman run --network todo --name postgres -d postgres

# Start the FE with host environment variable pointing to the DB container
podman run --network todo --name svelte -d -p 5000:5000 -e HOST=postgres svelte
```

Take note of how we expose the name of the Postgres pod into the FE container using environment variable. This will make it easier to make changes later, as we do not have to change the source code. We can then make this change so the FE makes use of the environment variable. This applies to secrets as well!

```typescript
// We can also input the host as a variable from podman
const host = process.env['HOST'];

const db = pgp({
  // host: "localhost",
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

### Docker/Podman related

- Create a specific Dockerfile (e.g. Dockerfile.dev) with hot reload for local development
- Multi stage builds to lower the size of the images!
- Create a Docker Compose file to start up both the DB and the application with one command, including a network!
- Health checks to automatically restart the container if it does not respond/crashes
  - Example: https://docs.docker.com/engine/reference/builder/#healthcheck
- Scale up! Run multiple instances of the application and put them behind a load balancer
- Add type safety between the front-end and the back-end?
- Add a volume to the DB container to persist data
- Add a volume to the FE container to persist data
