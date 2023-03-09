module.exports = (sequelize, Sequelize) => {
  const Topic = sequelize.define(
    "topics",
    {
      // timestamps: true,
      // updatedAt: false,
      name: {
        type: Sequelize.STRING(200),
        defaultValue: "Untitled",
      },
      description: {
        type: Sequelize.TEXT,
      },
      subject: {
        type: Sequelize.STRING,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      code: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.STRING,
      },
      cover: {
        type: Sequelize.STRING(512),
      },
    },
    {
      // timestamps: true,
      timestamps: false,
    }
  );
  return Topic;
};
