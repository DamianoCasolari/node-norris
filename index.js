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

//To create a server and env file 
const http = require("http")
const dotenv = require("dotenv");
const { json } = require("stream/consumers");
dotenv.config()

let port = +process.env.PORT || 3000
const localName = "http://localhost:"

//create a server with its response
const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-Type": "application/json" })

    createNorrisQuote().then(quote => {


        const data = fs.readFileSync(usersPath, 'utf8')

        let quotes = ""
        
        try {
            quotes = JSON.parse(data);
          } catch (error) {
            quotes = [];
          }
        
        quotes.push(quote)
        
        let updateQuotes = JSON.stringify(quotes)
        
        fs.writeFileSync(usersPath, updateQuotes, "utf-8")

        res.end(quote)
    });

});



// Link server with specific URL
server.listen(port, () => {
    console.log(localName + port);
})

/**
 * 
 * @returns {string} Random Norris Quote (async)
 */
function createNorrisQuote() {
    return fetch("https://api.chucknorris.io/jokes/random ")
        .then(Response => Response.json())
        .then(data => JSON.stringify(data.value, null, 2))

}







