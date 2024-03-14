# Part 2

## Bygg image

`cd part2\dotnet-docker`

Se på Dockerfile

`podman build . -t=tagname`

`podman images (se på images)`

`podman run -p 5000:8080 localhost/firstappimage (name of image given in tag)`

Gå til 'http://localhost:5000/' for å se på fungerende nettside i container.

`Ctrl`+`c` for å stanse containeren som kjører

## Gjør en endring og rebuild

Gjør en endring på `index.cshtml`

`podman build . -t=tagName (med samme tagName for å oppdatere imaget)`

`podman run -p 5000:8080 localhost/tagname`

`podman ps`

`podman rm containerId -f`
