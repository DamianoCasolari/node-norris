// Esercizio
// Sfruttando l’api https://api.chucknorris.io/jokes/random creare un applicazione che scarica una battuta random, la aggiunge ad un file json norrisDb.json e la mostra all’utente.
// Il file json quindi dovrà contenere la lista di tutte le battute scaricate nell’arco del tempo.
// E ricordate, con Chuck Norris le API non hanno il coraggio di ritornare un errore, per paura che Chuck le punisca.
// BONUS:
// Quando viene scaricata una battuta, controllare che questa non sia già presente nel file json locale. Se lo è, caricare un altra battuta.
// Buon lavoro!

//To write on file "NorrisDB"
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "database", "norrisDb.json");

//To create a server and file env
const http = require("http")
const dotenv = require("dotenv")
dotenv.config()

let port = +process.env.PORT || 3000
const localName = "http://localhost:"


const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-Type": "application/json" })

    createNorrisQuote().then(quote => {
        fs.writeFile(usersPath, quote, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        })
        res.end(quote)

    });


})



server.listen(port, () => {
    console.log(localName + port);
})


function createNorrisQuote() {
    return fetch("https://api.chucknorris.io/jokes/random ")
        .then(Response => Response.json())
        .then(data => JSON.stringify(data.value, null, 2))


}







