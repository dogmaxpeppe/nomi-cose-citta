# Nomi, Cose, Città

## Sommario

Lo scopo di quest'app, realizzata mediante Ionic, è di mettere a disposizione degli strumenti utili per giocare a Nomi, Cose e Città. Allo stato attuale, l'app può:
- Estrarre una lettera casualmente
- Gestire i giocatori della partita, tenendo traccia dei punteggi.

In qualsiasi momento sarà possibile "terminare la partita", con l'App che mostrerà la classifica finale.

La finalità di questo progetto Open Source è quella di sviluppare tramite Ionic un applicativo da usare durante il gioco "Nomi, Cose e Città" in sostituzione dei vecchi "carta e penna" per tener traccia dei punteggi e delle lettere da selezionare.

Ho deciso di rendere "Open" il progetto fornire un esempio possibile di sviluppo di un App Ionic. Essendo un progetto sviluppato durante il tempo libero ho utilizzato un approccio piuttosto "libero" sullo sviluppo di alcune funzionalità, quindi potreste trovare degli errori, anche grossolani. Se vorreste "contribuire" al miglioramento del codice, potete mandarmi una mail all'indirizzo `giu.senese@gmail.com`

In ogni caso, ci sono dei "TODO" di funzionalità che potrei sviluppare in futuro a tempo perso ;-)

## Tecnologie utilizzate
- Angular 12 (https://angular.io/)
- NgRx (https://ngrx.io/)

## Installazione (PC)
- Installare NodeJS (dovrebbe andar bene qualsiasi versione)
- Se non è stato già installato, installare Ionic CLI: npm install -g @ionic/cli
- Lanciare l'applicativo: `ionic serve`

L'applicativo verrà lanciato sul proprio browser predefinito e raggiungibile mediante l'indirizzo http://localhost:8100

## Installazione (Android)
Seguire il tutorial su https://ionicframework.com/docs/developing/android


## TODO
- Salvataggio persistente dei punteggi delle partite, anche in più slot di salvataggi (adesso, se si chiude l'app lo stato attuale della partita andrà perso)
- Avatar personalizzati (per ora ci sono solo una serie di Avatar predefiniti)
- Upgrade a Ionic 6 o successivi
