const { authJwt } = require("../middleware");

module.exports = function (app) {
  const questions = require("../controllers/question.controller.js");
  var router = require("express").Router();
  // Create a new Question
  router.post("/", questions.createQuestion);
  // Get question by subject
  router.get("/subject/:subject", questions.getQsBySubject);
  router.get("/topic/:topicid", questions.getQsByTopic);
  router.put("/", questions.modifyQuestion);
  app.use("/api/questions", router);
};
