const { authJwt } = require("../middleware");

module.exports = function (app) {
  const records = require("../controllers/record.controller.js");
  var router = require("express").Router();
  // Create a new Record
  router.post("/", records.createRecord);
  // Get all the records
  router.get("/", records.getAllRecords);
  router.get("/:profileId/:num", records.getNRecords);
  router.put("/", records.modifyRecord);
  app.use("/api/records", router);
};
