const db = require("../models");
const config = require("../config/auth.config");
const Topic = db.topic;

exports.createTopic = (req, res) => {
  Topic.create({
    name: req.body.name,
    description: req.body.description,
    subject: req.body.subject,
    code: req.body.code,
    level: req.body.level,
    cover: req.body.cover,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the topic.",
      });
    });
};

exports.getAllTopics = (req, res) => {
  Topic.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving topics.",
      });
    });
};

exports.getBySubject = (req, res) => {
  const subject = req.params.subject;
  Topic.findAll({ where: { subject: subject } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find topics.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving topics",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Topic.findByPk(id, { include: ["questions"] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find topic with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving topic with id=" + id,
      });
    });
};
