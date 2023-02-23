module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      name: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.STRING,
      },
      parentId: {
        type: DataTypes.INTEGER,
      },
      profileId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // timestamps: true,
      updatedAt: false,
    }
  );
  return Comment;
};
