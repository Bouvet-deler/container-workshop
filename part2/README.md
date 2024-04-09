# Part 2

Naviger til rett mappe: `cd part2/dotnet-docker`

Når vi bygger containere kan vi tagge dem med et beskrivende navn slik at de er lette å identifisere. Dette gjøres med tags. Hvis du allerede har en container med samme tag vil den bli overskrevet.

## Bygg image

Se på [`Dockerfile`](./dotnet-docker/Dockerfile).

Bestem hva du skal tagge containeren med (feks `part2`). Dette bruker du istedenfor `<tagname>` i kommandoene under.

1. Kjør følgende kommandoer:<br/>`podman build . -t=<tagname>`<br/>`podman images` (se på images)<br/>`podman run --rm -p 5000:8080 localhost/<tagname>`
2. Gå til http://localhost:5000/ for å se på fungerende nettside i container.
3. `Ctrl`+`C` for å stanse containeren som kjører.

## Gjør en endring og rebuild

1. Gjør en endring på `index.cshtml`
2. Kjør følgende kommandoer én etter én:

```bash
podman build . -t=<tagname>
podman run --rm -p 5000:8080 localhost/<tagname>
```
