const express = require("express");
const shopDb = require("../db/shop");

const adminsRoutes = express.Router();

//routes

//! get mainAdmin with token from db
adminsRoutes.get("/", (req, res) => {
  let adminToken = req.headers.authorization;

  let selectMainAdminQuery = `SELECT * FROM Admins WHERE token = ${adminToken}`;

  shopDb.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});




module.exports = adminsRoutes;
