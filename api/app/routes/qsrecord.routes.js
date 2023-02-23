const { authJwt } = require("../middleware");

module.exports = function (app) {
  const qsrecords = require("../controllers/qsrecord.controller.js");
  var router = require("express").Router();
  // Create a new Record
  router.post("/", qsrecords.createRecord);
  // Get all the records
  router.get("/", qsrecords.getAllRecords);
  router.get("/:profileId/:num", qsrecords.getNRecords);
  router.put("/", qsrecords.modifyRecord);
  app.use("/api/qsrecords", router);
};
