# Part 1

Start med å innstallere podman på maskinen din om du ikke har det fra før. Gå til 'https://podman.io/' for å laste ned og innstallere.

![Screenshot](podman.jpg)

Etter instllasjon må du kjøre følgende kommandoer i powershell e.l.

podman machine init  
podman machine start  

For å sjekke at alt er på plass og virker, kan du prøve:

podman info  

## Enkel oppgave å starte docker/podman reisen med. Python med Flask i container.

 cd PythonMedFlask  

 podman build . --tag hello_bouvet  

 podman run --rm -p 127.0.0.1:8000:8000 hello_bouvet

Bytt ut 'hello_bouvet' med hva du ønsker å kalle container image du lager.

Test containeren ved å åpne nettleser og gå til 'http://127.0.0.1:8000/' for å se en liten beskjed.  CTRL + C for å avslutte container. Bruk ikke localhost i stedet for 127.0.0.1, du kan jo prøve for å se resultatet.

## En enkelt utvikler container for Rust utvikling.

Hvis man f.eks ønsker et separat container for utvikling av programvare i Rust eller et annent språk for den sak skyld, kan man enkelt lage en container basert på offisielle imager.

cd RustUtviklerContainer  

podman build . --tag rusty_dev

podman run -it rusty_dev

Da er man inne i containeren. Sjekke ved å se på hash value i kommando linjen og kjør 'pwd' for å se hvilken path du er i inne i containeren.

cargo new --name hello hello_app  

cd hello_app  

cargo build  

cargo run  

Da ser du programmet i Rust bygget og kjørt inne i containeren. Merk at du mister alt inne i containeren om du ikke bruker volume for percistant storage. Man kan jo pushe til git e.l. i stedet om det er ønskelig og alltid starte med et rent utvikler miljø hver gang man starter containeren.

exit  

Bringer deg ut av container som avslutter og du mister all data.









## Presentasjonen er tilgjengelig.

[Link](https://bouvetasa.sharepoint.com/:p:/s/OstDSFaggruppeBackend/EQiDIA2TvY1Ouw4-nO50ewUBsMMbtoKddyl57glYvajbEA?e=inDSem) til presentasjon
