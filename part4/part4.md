# Part 4

## 4.1 Building the FE application

Make sure you are in the right directory /part4/svelte-frontend

```bash
podman build . -t nameOfImage:latest
```

-t : tag the image with a name and a tag

. : the path to the Dockerfile (we assume your current working directory is the root of the project (svelte-frontend/.))

nameOfImage:latest : the name and tag of the image (latest is the default tag if not specified) (run 'podman images' to see the list of images on your system)

## 4.2 Running the FE application

```bash
podman run -d -p 5000:5000 nameOfImage:latest
```

-d : run the container in the background (detached mode)

-p : map the port 5000 of the container to the port 5000 of the host

As we have set up the host to be exposed in package.json, we can now access the app at http://localhost:5000

## 4.3 Building the BE application

TODO

## 4.4 Running the BE application

TODO

```bash
podman run -d -e POSTGRESS_PASSORD=pass postgres
```

Note the absence of the -p flag. We do not need to expose the port of the container to the host as the FE will be communicating with the BE through a network.

## 4.5 Configuring the Front-End to use the Back-end

Now that the front and the back-end are up and running, we need to work on making them communicate.

We will take advantage of SvelteKit to act as an API for the DB (not recommended in production)

### Documentation

SvelteKit routing (+server) https://kit.svelte.dev/docs/routing#server

SvelteKit server side modules: https://kit.svelte.dev/docs/server-only-modules

## 4.6 Creating a network for the BE and FE to communicate

# Utilities

### Stop and remove all containers

`podman rm --force $(podman ps --all --quiet)`

### Remove all images

`podman rmi --force $(podman images --quiet)`

# Future work

- Keep creating the TODO app!
- Placeholder or loading screen while the app is loading
- Error handling
- Add type safety between the front-end and the back-end?
