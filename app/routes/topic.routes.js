const { authJwt } = require("../middleware");

module.exports = function (app) {
  const topics = require("../controllers/topic.controller.js");
  var router = require("express").Router();
  router.post("/", topics.createTopic);
  router.get("/", topics.getAllTopics);
  router.get("/id/:id", topics.findOne);
  router.get("/subject/:subject", topics.getBySubject);
  app.use("/api/topics", router);
};
