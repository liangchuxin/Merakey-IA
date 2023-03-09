const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Profile = db.profile;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({
              message: "User was registered successfully!",
              id: user.id,
              username: user.username,
            });
          });
        });
      } else {
        // user role = 1 默认是用户（而不是 mod 和 admin）
        user.setRoles([1]).then(() => {
          res.send({
            message: "User was registered successfully!",
            id: user.id,
            username: user.username,
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Update a User by the userId in the request
exports.updateUserRoles = (req, res) => {
  const userId = req.params.id;
  // 找到带有 request 里 id 的用户
  User.findOne({
    where: {
      id: userId,
    },
  })
    // 用户不存在
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // var passwordIsValid = bcrypt.compareSync(
      //   req.body.password,
      //   user.password
      // );

      // if (!passwordIsValid) {
      //   return res.status(401).send({
      //     accessToken: null,
      //     message: "Invalid Password!",
      //   });
      // }

      // var token = jwt.sign({ id: user.id }, config.secret, {
      //   expiresIn: 86400, // 24 hours
      // });

      // var authorities = [];
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User role was updated successfully!" });
          });
        });
      } else {
        res.send({ message: "User roles cannot be empty!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
// Game.update(req.body, {
//   where: { id: id },
// })
//   .then((num) => {
//     if (num == 1) {
//       res.send({
//         message: "Game was updated successfully.",
//       });
//     } else {
//       res.send({
//         message: `Cannot update Game with id=${id}. Maybe Game was not found or req.body is empty!`,
//       });
//     }
//   })
//   .catch((err) => {
//     res.status(500).send({
//       message: "Error updating Game with id=" + id,
//     });
//   });
