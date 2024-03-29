// These are our required libraries to make the server work.

const express = require('express');
const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose(); // We're including a server-side version of SQLite, the in-memory SQL server.


const app = express();
const port = process.env.PORT || 3000;

const db = new sqlite3.Database(':memory:', (err) => {
  if(err){
    return console.error('err.message');
  }
  console.log('Connected to the in-memory SQL database');
});

db.run("CREATE TABLE forms (form_id INTEGER PRIMARY KEY,name TEXT,zip TEXT,interests TEXT);",(err) => {
  if(err) {
    return console.log(err.message); 
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



function processDataForFrontEnd(req, res) {
  db.all("SELECT * FROM forms;", (err, rows) => {
    res.json({'data':rows});
  })
}

// Syntax change - we don't want to repeat ourselves,
// or we'll end up with spelling errors in our endpoints.
// 
app.route('/api')
  .get((req, res) => {processDataForFrontEnd(req, res)})
  .post((req, res) => {
    console.log("/api post request", req.body);
    res.send('your request was successful'); // simple mode
  })
  .put((req, res) => {
    console.log("/api put request" , req.body);

    db.run("INSERT INTO forms(name, zip, interests) VALUES(?,?,?);", [req.body.name,req.body.zip,req.body.interests], (err) => {
      if(err) {
        return console.log(err.message); 
      }
      res.json({body:"Your form has been stored"});
    });
    
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
