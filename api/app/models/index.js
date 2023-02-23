const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  operatorsAliases: 0,
  socketPath: "/var/run/mysqld/mysqld.sock",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.game = require("./game.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.profile = require("./profile.model.js")(sequelize, Sequelize);
db.topic = require("./topic.model")(sequelize, Sequelize);
db.record = require("./record.model")(sequelize, Sequelize);
db.question = require("./question.model")(sequelize, Sequelize);
db.qsrecord = require("./qsrecord.model")(sequelize, Sequelize);

// A topic has multiple questions, each question belongs to one topic only (one to many)
db.topic.hasMany(db.question, { as: "questions" });
db.question.belongsTo(db.topic, {
  foreignKey: "topicId",
  as: "topic",
});
// A game has multiple comments, each comment only belong to a game (one to many)
db.game.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.game, {
  foreignKey: "gameId",
  as: "game",
});
// A profile has multiple comments, each comment only belongs to a profile (one to many)
db.profile.hasMany(db.comment, { as: "comments", foreignKey: "profileId" });
db.comment.belongsTo(db.profile, {
  foreignKey: "profileId",
  as: "profile",
});
// A profile has multiple question records, each record only belongs to a profile (one to many)
db.profile.hasMany(db.qsrecord, { as: "qsrecords", foreignKey: "profileId" });
db.qsrecord.belongsTo(db.profile, {
  foreignKey: "profileId",
  as: "profile",
});
// A profile has multiple gaming records, each record belongs to an account (one to many)
db.profile.hasMany(db.record, { as: "records", foreignKey: "profileId" });
db.record.belongsTo(db.profile, {
  foreignKey: "profileId",
  as: "profile",
});

// A topic has multiple records, each record belongs to a topic (one to many)
db.topic.hasMany(db.record, { as: "records", foreignKey: "topicId" });
db.record.belongsTo(db.topic, {
  foreignKey: "topicId",
  as: "topic",
});

// A profile has multiple games, each game belongs to an account (one to many)
db.profile.hasMany(db.game, { as: "games", foreignKey: "authorId" });
db.game.belongsTo(db.profile, {
  foreignKey: "authorId",
  as: "author",
});

// Each game has multiple gaming records, each record belongs to a game (one to many)
db.game.hasMany(db.record, { as: "records", foreignKey: "gameId" });
db.record.belongsTo(db.game, {
  foreignKey: "gameId",
  as: "game",
});

// A user has a profile, a profile belongs to a user (one to one)
db.user.hasOne(db.profile, {
  foreignKey: "userId",
  as: "profile",
});
db.profile.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

// A user can have multiple roles, a role belongs to multiple users (many to many)
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
