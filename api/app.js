const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const mysql = require('mysql');

app.use(cors())
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dnd_task'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//show all items
app.get('/api/items',(req, res) => {
  let sql = "SELECT * FROM list1";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//add new item
app.post('/api/item',(req, res) => {
  let data = {name: req.body.name};
  let sql = "INSERT INTO list1 SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.post('/api/item2',(req, res) => {
    let data = {name: req.body.name};
    let sql = "INSERT INTO list2 SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
 
//Delete item
app.delete('/api/item/:id',(req, res) => {
  let sql = "DELETE FROM list1 WHERE ID="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});