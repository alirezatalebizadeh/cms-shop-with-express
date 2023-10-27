const express = require("express");
const shopDb = require("../db/shop");

const productsRouter = express.Router();

//rotes od products

//! get all products from db
productsRouter.get("/", (req, res) => {
  let selectAllProductsQuery = `SELECT * FROM Products`;

  shopDb.query(selectAllProductsQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result);
    }
  });
});

// ! delete one product from db
productsRouter.delete("/:productID", (req, res) => {
  let productID = req.params.productID;

  let deleteProductQuery = `DELETE FROM Products WHERE id = ${productID}`;

  shopDb.query(deleteProductQuery, (err, result) => {
    if (err) {
      console.log("error============> ", err);
      res.send("null");
    } else {
      res.send(result);
    }
  });
});

//! edit info of product
productsRouter.put("/:productID", (req, res) => {
  let body = req.body;
  let productID = req.params.productID;

  let updateProductQuery = `UPDATE Products SET title = "${body.title}",price = ${body.price} ,count =${body.count}, src = "${body.src} ", popularity= ${body.popularity}, sale =${body.sale} ,colors =${body.colors} WHERE id= ${productID}`;

  shopDb.query(updateProductQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result);
    }
  });
});

//!create product and save in db
productsRouter.post("/", (req, res) => {
  let body = req.body;
  let createProductQuery = `INSERT INTO Products  VALUES (NULL, "${body.title}",${body.price},${body.count}, "${body.src}",${body.popularity},${body.sale},${body.colors})`;

  shopDb.query(createProductQuery, (err, result) => {
    if (err) {
      res.send("null=========>", err);
    } else {
      res.send(result);
    }
  });
});

module.exports = productsRouter
