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
podman run -d -p 5432:5432 postgres
```

## 4.5 Configuring the Front-End to use the Back-end

We recommend using "npm run dev" command to start the application in development mode. This will start a development server that will automatically reload the application when changes are made. This will make it easier to test and debug our changes.

Now that the front and the back-end are up and running, we need to work on making them communicate.

We will take advantage of SvelteKit to act as an API for the DB (not recommended in production)

Create a new file /routes/api/todo/+server.ts

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

export const GET = async () => {
  try {
    const data = await db.any('SELECT * FROM todo');
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error('ERROR:', error);
    return { status: 500, body: { error: 'Database query failed' } };
  }
};
```

We can now fetch the data from the DB anywhere in the app by using the fetch function

```typescript
import { onMount } from 'svelte';

let data: string;

onMount(async () => {
  const resp = await fetch('/api/todo');
  console.log(resp);
  data = await resp.json();
});
```

Data can now be used in the template by simply writing {data}

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

Because it is configured/expecting to reach the DB at localhost, we must change configuration to reach the DB. We can find the IP of the DB container by running "podman inspect CONTAINERID/NAME" on the DB container. We can then use this IP to reach the DB from the FE. This is not a good solution as the IP of the DB container can change if the container is restarted.

We can use either the container id or container name. I suggest container name as this is something we can control

```bash
# Start the DB container with a specific name
podman run --network todo --name postgres -d postgres

# Start the FE with host environment variable pointing to the DB container
podman run --network todo --name svelte -d -p 5000:5000 -e HOST=postgres svelte
```

🥳

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

- Keep creating the TODO app! Add the ability to add, delete and update todos, display the todos in a better fashion, etc..
- Scale up! Run multiple instances of the application and put them behind a load balancer
- Placeholder or loading screen while the app is loading from DB?
- Error handling?
- Add type safety between the front-end and the back-end?
- Add a volume to the DB container to persist data
- Add a volume to the FE container to persist data
