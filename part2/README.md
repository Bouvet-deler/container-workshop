# Part 2

## Installer podman

`Podman machine init`

`Podman machine start`

## Bygg image

`cd part2`

Se på Dockerfile

`podman build . -t=tagName`

`podman images (se på images)`

`podman run -p 5000:80 localhost/firstappimage (name of image given in tag)`

`Ctrl`+`c` for å stanse containeren som kjører

## Gjør en endring og rebuild

Gjør en endring på `index.cshtml`

`podman build . -tagName (med samme tagName for å oppdatere imaget)`

`podman run -p 5000:80 localhost/tagName`

`podman ps`

`podman rm containerId -f`
