module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      // id는 기본적으로 들어있다.
      content: {},
    },
    {
      charset: "utf8mb4", //한글에 이모티콘까지 쓰고싶으면 mb4추가해주기
      collate: "utf8mb4-general-ci", //한글,이모티콘 저장
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };

  return User;
};
