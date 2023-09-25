const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
});

con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

con.end((err) => {});

