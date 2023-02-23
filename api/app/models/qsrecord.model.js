module.exports = (sequelize, Sequelize) => {
  const QsRecord = sequelize.define(
    "qsrecords",
    {
      questionId: {
        type: Sequelize.INTEGER,
      },
      wrongAnswer: {
        type: Sequelize.STRING,
      },
    },
    { updatedAt: false }
  );

  return QsRecord;
};
