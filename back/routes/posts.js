const express = require("express");
const { Post, User, Image, Comment } = require("../models/");

const router = express.Router();

router.get("/", async (req, res, next) => {
  //GET /posts 여러개 가져올때, 복수니까
  try {
    const posts = await Post.findAll({
      //   where,
      limit: 10, // 10개만 가져와라, 스크롤내리면 또 10개만 가져오고 ....
      //   offset: 0, // 1~10번 게시글 가져와라, offset이 100이면? 101~110번 게시글 가져와라.
      order: [
        ["createdAt", "DESC"], //
        [Comment, "createdAt", "DESC"],
      ], // 내림차순 순으로 데이터를 가져와라. (최신 데이터부터 가져와라)
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
