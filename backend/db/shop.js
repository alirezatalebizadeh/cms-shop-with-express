const mysql = require("mysql");
//!create a connection with mysql

const shopDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shop",
});

module.exports = shopDB;
