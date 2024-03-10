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

Test containeren ved å åpne nettleser og gå til 'http://127.0.0.1:8000/' for å se en liten beskjed.  CTRL + C for å avslutte container. Bruk ikke localhost i stedet for 127.0.0.1, du kan jo prøve for å se resultatet.

## Neste Oppgave er en enkel dotnet build. Hente kode fra github og så bygge en enkel GrapQL & Dotnet app

cd Oppgave_DotNetBuild  

 podman build --no-cache -t stenbror/dotnetbuild .  
 podman run --rm -it --privileged -v "$(PWD):/home/app" stenbror/dotnetbuild:latest bash   ( Her er du interaktivt inne i selve containeren, se deg om for å se innholdet av en container )  

 I et annet vidu i powershell e.l. kjør følgende kommando. Du er da utenfor containeren.

 podman ps  

 Ser du containeren som kjører?

I container vinduet. Kjør 'exit' for å avslutte containeren etter bruk.

## Tredje Oppgave er et eksempel på utvikling for IoT / Mobil e.l.






[Link](https://bouvetasa.sharepoint.com/:p:/s/OstDSFaggruppeBackend/EQiDIA2TvY1Ouw4-nO50ewUBsMMbtoKddyl57glYvajbEA?e=inDSem) til presentasjon
