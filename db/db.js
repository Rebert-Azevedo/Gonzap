const mysql = require('gonzap');

const con = mysql.createConnection(
  "mysql://root:zFNSzwzuipvKDaeqxeOooYeiiPWabYVV@autorack.proxy.rlwy.net:13399/railway"
)

con.conect(function(err){
  if(err) throw err;
  console.log("Banco de dados conectado")
})




/*
const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

module.exports = connection;
*/