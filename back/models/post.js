module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      // id는 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", //한글에 이모티콘까지 쓰고싶으면 mb4추가해주기
      collate: "utf8mb4_general_ci", //한글,이모티콘 저장
    }
  );
  Post.associate = (db) => {
    // 관계
    db.Post.belongsTo(db.User); // 게시글은 작성자한테 속해있다.
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'});
    db.Post.hasMany(db.Comment); // 게시글은 많은 댓글을 가지고 있다
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };

  return Post;
};
