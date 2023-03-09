module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define(
    "questions",
    {
      question: {
        type: Sequelize.TEXT,
      },
      subject: {
        type: Sequelize.STRING,
      },
      correctStatNum: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      wrongStatNum: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      correctAns: {
        type: Sequelize.TEXT,
      },
      explanation: {
        type: Sequelize.TEXT,
        defaultValue:
          "No explanations right now, email admin for help or contribute an explanation",
      },
    },
    {
      timestamps: false,
    }
  );
  return Question;
};
