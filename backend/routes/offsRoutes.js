const express = require("express");
const shopDb = require("../db/shop");

const offsRouter = express.Router();

//rotes of offs

//! get all orders from db
offsRouter.get("/", (req, res) => {
  //! connect aome tables in db to get data 
  let selectAllOffsQuery = `SELECT Offs.id,Offs.code,Offs.percent,Offs.date,Offs.isActive, Admins.firstName as adminID , Products.title as productID from Offs INNER JOIN Admins on Admins.id = Offs.adminID INNER JOIN Products on Products.id =Offs.productID`;

  shopDb.query(selectAllOffsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

//! delete off from db
offsRouter.delete("/:offID", (req, res) => {
  let offID = req.params.offID;

  let deleteOffQuery = `DELETE FROM Offs WHERE id = ${offID}`;

  shopDb.query(deleteOffQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result, "one off deleted");
    }
  });
});

//! update order from db
offsRouter.put("/active-offs/:offID/:isActive", (req, res) => {
  let offID = req.params.offID;
  let isActive = req.params.isActive;

  let updateOffQuery = `UPDATE Offs SET isActive='${isActive} WHERE id=${offID}`;

  shopDb.query(updateOffQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result, "one order updated");
    }
  });
});

module.exports = offsRouter;
