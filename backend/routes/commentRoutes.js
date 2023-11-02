const express = require("express");
const shopDb = require("../db/shop");
const commentsRouter = express.Router();

//rotes of comments

//! get all comments from db
commentsRouter.get("/", (req, res) => {
  //!refactor query to connect to users's table and product's table and join that
  let selectAllCommentsQuery = `SELECT Comments.id , Comments.body , Comments.date , Comments.hour , Users.firstName as userID ,Users.lastName as userFamily , Products.title as productID from Comments INNER JOIN Users on Users.id = Comments.userID INNER JOIN Products on Products.id =Comments.productID`;

  shopDb.query(selectAllCommentsQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result);
    }
  });
});


//! delete comment from db
commentsRouter.delete("/:commentID", (req, res) => {
  let commentID = req.params.commentID;

  let deleteCommentQuery = `DELETE FROM Comments WHERE id = ${commentID}`;

  shopDb.query(deleteCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

//! update comment
commentsRouter.put("/:commentID", (req, res) => {
  let commentID = req.params.commentID;

  let updateCommentQuery = `UPDATE Comments SET body='${req.body.body}' WHERE id = ${commentID}`;
  shopDb.query(updateCommentQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result);
    }
  });
});

module.exports = commentsRouter;
