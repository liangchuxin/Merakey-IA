module.exports = (app) => {
  const games = require("../controllers/game.controller.js");
  var router = require("express").Router();
  // Create a new Game
  router.post("/", games.create);
  // Retrieve all Games
  router.get("/", games.findAll);
  // Retrieve all Games with order
  router.get("/all/:order", games.findAllOrder);
  // Retrieve all published Games
  router.get("/published", games.findAllPublished);
  // Retrieve a single Game with id
  router.get("/:id", games.findOne);
  // Retrieve meta of a single Game with id
  router.get("/meta/:id", games.getGameMeta);
  // Retrieve cover ora single Game with id
  router.get("/:id/cover", games.getCover);
  // Retrieve games that fit query with order
  router.get("/search/:query/:order", games.search);
  // Update a Game with id
  router.get("/recent/:num", games.findRecent);
  // Get most recent 'num' games
  router.put("/:id", games.update);
  // Delete a Game with id
  router.delete("/:id", games.delete);
  // Delete all Games
  router.delete("/", games.deleteAll);
  app.use("/api/games", router);
};
