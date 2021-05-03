module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // id는 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATATIME
        allowNull: false, // 필수
        unique: true, // 고유한값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100), //암호화를 하면 길이가 늘어나기 때문에 늘려놓음
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8-general-ci", //한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); //사람이 게시글을 여러개 가질 수 있다. (일대다 관계)
    db.User.hasMany(db.Comment); //한사람이 댓글을 여러개 쓸 수 있는데 그 댓글은 작성자가 한명이다. (일대다 관계)
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId",
    });
  };

  return User;
};
