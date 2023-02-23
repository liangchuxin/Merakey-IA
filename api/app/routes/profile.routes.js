const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const profiles = require("../controllers/profile.controller.js");
  var router = require("express").Router();
  // Create a new Profile
  app.post("/api/profiles", profiles.makeProfile);
  app.put("/api/profiles", profiles.modifyProfile);
  router.get("/:id", profiles.getProfileById);
  router.get("/games/:id", profiles.getProfileGames);
  app.use("/api/profiles", router);
  router.get("/board/top", profiles.getLeaderboard);
};
