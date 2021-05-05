const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post } = require("../models");
const passport = require("passport");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다."); //요청이 한번이니까 응답 한번, 응답 두번보내면 에러나는거 조심하기
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //뒤의 숫자의 의미는 높을수록 보안이 쌔짐, 하지만 암호화 하느라 시간이 엄청 오래걸림. 적절히 설정해야됨.
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060'); //3060에서 온 요청을 허용하겠다.
    res.status(201).send("ok");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/user/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
