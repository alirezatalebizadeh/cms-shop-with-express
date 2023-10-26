const express = require("express");
const shopDb = require("../db/shop");
const ordersRouter = express.Router();

//rotes of orders

//! get all orders from db
ordersRouter.get("/", (req, res) => {
  let selectAllOrdersQuery = `SELECT * FROM Orders`;

  shopDb.query(selectAllOrdersQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result);
    }
  });
});

//! delete order from db
ordersRouter.delete("/:orderID", (req, res) => {
  let orderID = req.params.orderID;

  let deleteOrderQuery = `DELETE FROM Orders WHERE id = ${orderID}`;

  shopDb.query(deleteOrderQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result, "one order deleted");
    }
  });
});

//! update order from db
ordersRouter.put("/active-order/:orderID/:isActive", (req, res) => {
  let orderID = req.params.orderID;
  let isActive = req.params.isActive;

  let updateOrderQuery = `UPDATE Orders SET isActive='${isActive} WHERE id=${orderID}`;

  shopDb.query(updateOrderQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result, "one order updated");
    }
  });
  
});

module.exports = ordersRouter;
