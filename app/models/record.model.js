module.exports = (sequelize, Sequelize) => {
  const Record = sequelize.define(
    "records",
    {
      // 玩游戏的人，玩的游戏，玩的时间，最后的分数，玩到的结局
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      end: {
        type: Sequelize.STRING, // not done, happy end, bad end, true end
        defaultValue: "not done",
      },
    },
    { updatedAt: false }
  );

  return Record;
};
