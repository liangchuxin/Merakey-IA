module.exports = (app) => {
  const comments = require("../controllers/comment.controller");
  var router = require("express").Router();
  // Create a new Comment
  router.post("/:id", comments.create);
  // Get all comments
  router.get("/", comments.findAll);
  // Find a comment by id
  router.get("/id/:id", comments.findCommentById);
  // Find all comments in a game
  router.get("/:gameId", comments.findByGame);
  // Delete a Comment with id
  router.delete("/:id", comments.delete);
  app.use("/api/comments", router);
};
