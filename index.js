

// To write on file "NorrisDB"
const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "database", "norrisDb.json");

// ​To create a server and env file

const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

let port = +process.env.PORT || 3000;
const localName = "http://localhost:";

// create a server with its response
const server = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") {
    res.writeHead(404).end();
  }

  res.writeHead(200, { "content-Type": "application/json" });

  createNorrisQuote(res);
});

// Link server with specific URL
server.listen(port, () => {
  console.log(localName + port);
});

/**
 *
 * @returns {string} Random Norris Quote (async)
 */
function createNorrisQuote(res) {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((Response) =>{
        if(!Response.ok){
          let error =  Response.status.toString()
          console.log("Abbiamo riscontrato un errore " + error + " col l'applicazione, riprovare in un secondo momento");
          res.end("Abbiamo riscontrato un errore " + error + " col l'applicazione, riprovare in un secondo momento")  
        }
        return  Response.json()
        })
    .then((data) => {
      const singleQuote = data.value;
      
      if(data.value){
          const quotes = getJsonData();
          if (!quotes.includes(singleQuote)) {
            quotes.push(singleQuote);
            fs.writeFileSync(usersPath, JSON.stringify(quotes), "utf-8");
            res.end(singleQuote);
          } else {
            createNorrisQuote(res);
          }

      }
    })
}
 
function getJsonData() {
  const db = fs.readFileSync(usersPath, "utf8");
  try {
    return JSON.parse(db);
  } catch (error) {
    return [];
  }
}
