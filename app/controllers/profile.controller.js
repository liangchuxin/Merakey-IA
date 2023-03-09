const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Profile = db.profile;

exports.makeProfile = (req, res) => {
  Profile.create({
    displayName: req.body.displayName,
    id: req.body.id,
    // 请求的时候加上一个 x-access-header
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile.",
      });
    });
};

exports.getProfileById = (req, res) => {
  const id = req.params.id;
  Profile.findByPk(id, {
    include: ["comments", "records"],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Profile with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Profile with id=" + id + err,
      });
    });
};

exports.getProfileGames = (req, res) => {
  const id = req.params.id;
  Profile.findByPk(id, {
    include: ["games"],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Profile with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Profile with id=" + id + err,
      });
    });
};

exports.getLeaderboard = (req, res) => {
  Profile.findAll({
    limit: 9,
    order: [["scores", "DESC"]],
    include: ["records"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving records.",
      });
    });
};

exports.modifyProfile = (req, res) => {
  const id = req.body.id;
  data = {
    scores: req.body.scores,
    questions: req.body.questions,
    displayName: req.body.displayName,
    avatar: req.body.avatar,
    status: req.body.status,
  };
  Profile.update(data, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Profile was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id,
      });
    });
};
