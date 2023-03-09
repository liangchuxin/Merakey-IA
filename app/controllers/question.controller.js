const db = require("../models");
const config = require("../config/auth.config");
const Question = db.question;

exports.createQuestion = (req, res) => {
  Question.create({
    question: req.body.question,
    subject: req.body.subject,
    correctAns: req.body.correctAns,
    explanation: req.body.explanation,
    topicId: req.body.topicId,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the question.",
      });
    });
};

exports.modifyQuestion = (req, res) => {
  const id = req.body.id;
  data = {
    question: req.body.question,
    subject: req.body.subject,
    correctAns: req.body.correctAns,
    explanation: req.body.explanation,
    topicId: req.body.topicId,
  };
  Question.update(data, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Question was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Question with id=${id}. Maybe Profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Question with id=" + id,
      });
    });
};

exports.getQsBySubject = (req, res) => {
  const sub = req.params.subject;
  Question.findAll({
    where: {
      subject: sub,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};

exports.getQsByTopic = (req, res) => {
  const top = req.params.topicid;
  Question.findAll({
    where: {
      topicId: top,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};
