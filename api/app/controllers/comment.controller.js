const db = require("../models");
const Comment = db.comment;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
  var gameId = req.params.id;
  // Validate request
  if (!req.body.text) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const comment = {
    text: req.body.text,
    gameId: gameId,
    profileId: req.body.userId,
    parentId: req.body.parentId,
  };
  Comment.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Game.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Comment.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games.",
      });
    });
};
exports.findByGame = (req, res) => {
  const game = req.params.gameId;
  Comment.findAll({ where: { gameId: game } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games.",
      });
    });
};
exports.findCommentById = (req, res) => {
  const id = req.params.id;
  Comment.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Game was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Game with id=${id}. Maybe Game was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Game with id=" + id,
      });
    });
};
