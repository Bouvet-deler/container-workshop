Part 4

## 4.1 Building the FE application

```bash
podman build . -t nameOfImage:latest
```

-t : tag the image with a name and a tag

. : the path to the Dockerfile

nameOfImage:latest : the name and tag of the image

## 4.2 Running the FE application

```bash
podman run -d -p 5000:5000 nameOfImage:latest
```

-d : run the container in the background (detached mode)

-p : map the port 5000 of the container to the port 5000 of the host

As we have set up the host to be exposed in package.json, we can now access the app at http://localhost:5000
