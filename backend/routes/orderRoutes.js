const express = require("express");
const shopDb = require("../db/shop");
const ordersRouter = express.Router();

//rotes of orders

//! get all orders from db
ordersRouter.get("/", (req, res) => {
  //! refactor query to connect with products'table and users's table to get data
  let selectAllOrdersQuery = `SELECT Orders.id , Orders.date,Orders.price,Orders.off,Orders.sale,Orders.popularity,Orders.count,Orders.saleCount,Orders.isActive , Users.firstName as userID , Products.title as productID from Orders INNER JOIN Users on Users.id = Orders.userID INNER JOIN Products on Products.id =Orders.productID`;

  shopDb.query(selectAllOrdersQuery, (err, result) => {
    if (err) {
      res.send(null);
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
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

//! update order from db
ordersRouter.put("/active-order/:orderID/:isActive", (req, res) => {
  let orderID = req.params.orderID;
  let isActive = req.params.isActive;
  console.log(req.params);

  let updateOrderQuery = `UPDATE Orders SET isActive=${isActive} WHERE id=${orderID}`;

  shopDb.query(updateOrderQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = ordersRouter;
