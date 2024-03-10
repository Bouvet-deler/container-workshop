# Part 1

Start med å innstallere podman på maskinen din om du ikke har det fra før. Gå til 'https://podman.io/' for å laste ned og innstallere.

![Screenshot](podman.jpg)

Etter instllasjon må du kjøre følgende kommandoer i powershell e.l.

podman machine init  
podman machine start  

For å sjekke at alt er på plass og virker, kan du prøve:

podman info  

## Enkel oppgave å starte docker/podman reisen med. Python med Flask i container.

 cd Oppgave  

 podman build . --tag hello_bouvet  

 podman run --rm -p 127.0.0.1:8000:8000 hello_bouvet

Bytt ut 'hello_bouvet' med hva du ønsker å kalle container image du lager.




[Link](https://bouvetasa.sharepoint.com/:p:/s/OstDSFaggruppeBackend/EQiDIA2TvY1Ouw4-nO50ewUBsMMbtoKddyl57glYvajbEA?e=inDSem) til presentasjon
