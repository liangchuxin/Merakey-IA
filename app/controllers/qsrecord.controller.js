const db = require("../models");
const config = require("../config/auth.config");
const Qsrecord = db.qsrecord;

exports.createRecord = (req, res) => {
  Qsrecord.create({
    questionId: req.body.questionId,
    wrongAnswer: req.body.wrongAnswer,
    profileId: req.body.profileId,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the record.",
      });
    });
};

exports.modifyRecord = (req, res) => {
  const id = req.body.id;
  data = {
    wrongAnswer: req.body.wrongAnswer,
    profileId: req.body.profileId,
  };
  Qsrecord.update(data, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Record was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Record with id=${id}. Maybe Profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Record with id=" + id,
      });
    });
};

exports.getAllRecords = (req, res) => {
  Qsrecord.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving records.",
      });
    });
};

exports.getNRecords = (req, res) => {
  const num = parseInt(req.params.num);
  const profileId = req.params.profileId;
  Qsrecord.findAll({
    limit: num,
    order: [["createdAt", "DESC"]],
    where: {
      profileId: profileId,
    },
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
