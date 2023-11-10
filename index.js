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
    if(req.url == "/favicon.ico"){
        res.writeHead(404).end();
    }
    res.writeHead(200, { "content-Type": "application/json" })

    createNorrisQuote(checkQuote).then(quote => {

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
function createNorrisQuote(checkQuote) {
    return fetch("https://api.chucknorris.io/jokes/random ")
        .then(Response => Response.json())
        .then(data => {
            let singleQuote = JSON.stringify(data.value, null, 2)
            checkQuote(usersPath, singleQuote)
        })

}



//create method to check quptes db
function checkQuote(usersPath, singleQuote) {

    const data = fs.readFileSync(usersPath, 'utf8')

    let quotes = ""

    try {
        quotes = JSON.parse(data);
    } catch (error) {
        quotes = [];
    }


    if (!quotes.includes(singleQuote)) {
        quotes.push(singleQuote)

    } else {
        createNorrisQuote(checkQuote)
        return
    }


    let updateQuotes = JSON.stringify(quotes)

    fs.writeFileSync(usersPath, updateQuotes, "utf-8")

    console.log(singleQuote); 
}




