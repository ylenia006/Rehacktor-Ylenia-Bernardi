# Rehacktor

## Descrizione
Rehacktor è un'applicazione sviluppata con **React** che permette agli utenti di navigare tra una vasta libreria di giochi, cercare titoli specifici e visualizzarne i dettagli. L'app include filtri avanzati per genere e piattaforma, oltre a funzionalità interattive dedicate agli utenti registrati, come la gestione dei preferiti e una chat in tempo reale.

## API e Tecnologie
Rehacktor si basa sulle seguenti tecnologie:
- **[RAWG API](https://rawg.io/apidocs)** per ottenere dati aggiornati sui giochi.
- **[Supabase](https://supabase.com/)** come Backend-as-a-Service (BaaS) per autenticazione e gestione del database.
- **CSS Module**, **Material-UI** e **PicoCSS** per uno stile moderno e reattivo.

## Pagine Principali
- **Home Page**: Visualizza una griglia di card con i giochi disponibili, permette la ricerca per titolo, il filtraggio tramite sidebar e l'accesso alla registrazione e login.
- **Pagina Dettaglio**: Mostra le informazioni dettagliate di un gioco selezionato e consente agli utenti registrati di chattare in tempo reale e salvare il gioco tra i preferiti.
- **Pagina Filtri per Genere**: Mostra una griglia di giochi filtrati per genere.
- **Pagina Filtri per Piattaforma**: Mostra una griglia di giochi filtrati per piattaforma.
- **Pagina Register**: Permette la registrazione di un nuovo utente.
- **Pagina Login**: Permette l'accesso agli utenti già registrati.
- **Pagina Account**: Mostra le informazioni personali dell'utente, la sua lista di giochi preferiti e dei suoi commenti.

## Interazioni Utente
### Utenti Non Autenticati
- Esplorare l'intero catalogo giochi.
- Cercare giochi per titolo.
- Filtrare i giochi per genere e piattaforma.
- Visualizzare informazioni dettagliate sui giochi.
- Registrarsi con email e password.

### Utenti Autenticati
- Aggiornare le informazioni del proprio profilo.
- Aggiungere e rimuovere un gioco dai preferiti, commentare e valutare un gioco.
- Chattare in tempo reale con altri utenti registrati.

## Gestione dello Stato con Context API
- **Session Context**: Gestisce lo stato di autenticazione dell'utente.

## Deployment
L'applicazione è disponibile online al seguente indirizzo:
🔗 [Reahaktor Live](https://rehacktor-where-code-meets-the-game.vercel.app)

