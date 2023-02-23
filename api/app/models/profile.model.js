module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profiles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    avatar: {
      type: Sequelize.STRING,
      defaultValue:
        "https://cdn.jsdelivr.net/gh/liangchuxin/blog-imgs/img/202209210139990.png",
    },
    displayName: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "gaming",
    },
    scores: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    questions: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  return Profile;
};
