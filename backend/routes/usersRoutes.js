const express = require("express");
const shopDb = require("../db/shop");
const usersRouter = express.Router();

//rotes of users

//! get all users from db
usersRouter.get("/", (req, res) => {
  let selectAllUsersQuery = `SELECT * FROM Users`;

  shopDb.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

//! delete user from db
usersRouter.delete("/:userID", (req, res) => {
  let userID = req.params.userID;
  console.log(userID);
  let deleteUserQuery = `DELETE FROM Users WHERE id = ${userID}`;
  shopDb.query(deleteUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

//! update user from db
usersRouter.put("/:userID", (req, res) => {
  let userID = req.params.userID;
  let body = req.body;
  console.log(body);

  let updateUserQuery = `UPDATE Users SET firstName= '${body.firstName}',lastName='${body.lastName}',userName='${body.userName}',password='${body.password}',phone='${body.phone}',email='${body.email}',city='${body.city}',address='${body.address}',score=${body.score},buy=${body.buy} WHERE id = ${userID}`;

  shopDb.query(updateUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = usersRouter;
