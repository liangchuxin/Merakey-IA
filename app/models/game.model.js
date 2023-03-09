module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define(
    "game",
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
      authorId: {
        type: Sequelize.INTEGER,
      },
      playTime: {
        type: Sequelize.INTEGER,
      },
      published: {
        type: Sequelize.BOOLEAN,
      },
      subject: {
        type: Sequelize.STRING,
      },
      players: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      tags: {
        type: Sequelize.TEXT,
      },
      plot: {
        type: Sequelize.JSON,
      },
      coverW: {
        type: Sequelize.STRING(512),
      },
      coverR: {
        type: Sequelize.STRING(512),
      },
    },
    {
      // timestamps: true,
      updatedAt: false,
    }
  );
  return Game;
};
