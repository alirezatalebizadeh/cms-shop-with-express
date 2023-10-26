const express = require("express");
const shopDb = require("../db/shop");
const commentsRouter = express.Router();

//rotes of comments


//! get all comments from db
commentsRouter.get("/", (req, res) => {
  let selectAllCommentsQuery = `SELECT * FROM Comments`;

  shopDb.query(selectAllCommentsQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result);
    }
  });
});


//! delete comment from db
commentsRouter.delete('/:commentID',(req,res)=>{
    let commentID= req.params.commentID

    let deleteCommentQuery=`DELETE FROM Comments WHERE id = ${commentID}`

    shopDb.query(deleteCommentQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result,'comment deleted');
    }
  });
})


//! update comment
commentsRouter.put('/:commentID',(req,res)=>{
    let commentID= req.params.commentID    

    let updateCommentQuery=`UPDATE Comments SET body=${req.body.body} WHERE id = ${commentID}`

    shopDb.query(updateCommentQuery, (err, result) => {
    if (err) {
      res.send("null", err);
    } else {
      res.send(result,'comment updated');
    }
  });
})



module.exports = commentsRouter;
