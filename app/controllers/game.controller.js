const db = require("../models");
const Game = db.game;
// const Comment = db.comments;
const Op = db.Sequelize.Op;
// Create and Save a new Game
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Game
  const game = {
    name: req.body.name,
    description: req.body.description,
    authorId: req.body.authorId,
    playTime: req.body.playTime,
    published: req.body.published ? req.body.published : false,
    subject: req.body.subject,
    // players: req.body.players,
    tags: req.body.subject,
    plot: req.body.plot,
    coverW: req.body.coverW,
    coverR: req.body.coverR,
  };
  // Save Game in the database
  Game.create(game)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Game.",
      });
    });
};
// Retrieve all Games from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Game.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games.",
      });
    });
};
// Retrieve all Games from the database with order.
exports.findAllOrder = (req, res) => {
  var searchOrder;
  switch (req.params.order) {
    case "general":
      searchOrder = [["createdAt", "ASC"]];
      break;
    case "recents":
      searchOrder = [["createdAt", "DESC"]];
      break;
    case "plays":
      searchOrder = [["players", "DESC"]];
      break;
    case "views":
      searchOrder = [["views", "DESC"]];
      break;
    case "comments":
      searchOrder = [
        db.sequelize.fn("len", db.sequelize.col("comments")),
        "DESC",
      ];
      break;
    default:
      searchOrder = [["createdAt", "ASC"]];
      break;
  }
  Game.findAll({
    attributes: [
      "id",
      "name",
      "coverR",
      "players",
      "views",
      "createdAt",
      "authorId",
      "playTime",
    ],
    where: { published: true },
    order: searchOrder,
    include: ["comments"],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find games.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving games",
      });
    });
};
// Find a single Game with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Game.findByPk(id, { include: ["comments"] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Game with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Game with id=" + id,
      });
    });
};

exports.getGameMeta = (req, res) => {
  const id = req.params.id;
  Game.findByPk(id, {
    attributes: [
      "name",
      "description",
      "authorId",
      "players",
      "views",
      "tags",
      "coverR",
      "createdAt",
      "playTime",
    ],
    where: { published: true },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Game with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Game with id=" + id,
      });
    });
};

// Update a Game by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Game.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Game was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Game with id=${id}. Maybe Game was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Game with id=" + id,
      });
    });
};
// Delete a Game with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Game.destroy({
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
// Delete all Games from the database.
exports.deleteAll = (req, res) => {
  Game.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Games were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all games.",
      });
    });
}; // Find all published Games
exports.findAllPublished = (req, res) => {
  Game.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games.",
      });
    });
};
exports.findRecent = (req, res) => {
  const num = parseInt(req.params.num);
  Game.findAll({
    limit: num,
    where: { published: true },
    order: [["createdAt", "DESC"]],
    attributes: ["id", "coverR"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games.",
      });
    });
};
exports.getCover = (req, res) => {
  const id = parseInt(req.params.id);
  Game.findByPk(id, {
    attributes: ["coverR"],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Game with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Game with id=" + id,
      });
    });
};
exports.search = (req, res) => {
  const query = req.params.query;
  var searchOrder;
  switch (req.params.order) {
    case "general":
      searchOrder = [["createdAt", "ASC"]];
      break;
    case "recents":
      searchOrder = [["createdAt", "DESC"]];
      break;
    case "plays":
      searchOrder = [["players", "DESC"]];
      break;
    case "views":
      searchOrder = [["views", "DESC"]];
      break;
    case "comments":
      searchOrder = [
        [db.sequelize.fn("length", db.sequelize.col(["comments"])), "DESC"],
      ];
      break;
    default:
      searchOrder = [["createdAt", "ASC"]];
      break;
  }
  Game.findAll({
    where: {
      name: {
        [Op.substring]: query,
      },
      published: true,
    },
    order: searchOrder,
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find games.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving games",
      });
    });
};

// // comments

// exports.createComment = (gameId, comment) => {
//   return Comment.create({
//     name: comment.name,
//     text: comment.text,
//     gameId: gameId,
//   })
//     .then((comment) => {
//       console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
//       return comment;
//     })
//     .catch((err) => {
//       console.log(">> Error while creating comment: ", err);
//     });
// };
// exports.findCommentById = (id) => {
//   return Comment.findByPk(id, { include: ["game"] })
//     .then((comment) => {
//       return comment;
//     })
//     .catch((err) => {
//       console.log(">> Error while finding comment: ", err);
//     });
// };
