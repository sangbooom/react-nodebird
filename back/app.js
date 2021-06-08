const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); //에러 로그랑 더 잘보여줌, 접속한 사용자의 ip를 보여주기도함
  app.use(hpp()); // 보안에 도움되는 것들
  app.use(helmet()); // 보안에 도움되는 것들
} else {
  app.use(morgan("dev"));
}

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3060", "http://3.36.220.168"],
    credentials: true,
  })
);
app.use(express.json()); // 프론트에서 req에 post,put,patch로 넘겨주면 해석해준다. axios에서 데이터 보낼떄
app.use(express.urlencoded({ extended: true })); //form에서 submit하면 데이터가 인코딩된 형식으로 넘어간다. 일반데이터로 보낼때

// 왜 앱에는 multer 적용 안할까? 어떤 폼에서는 image를 여러개 올릴것이고 어떤 폼에서는 텍스트를 올릴수도 있다. 멀티파트로 보낼수도 있다
// 앱에 장착하면 모든 라우터에 적용이 되고 라우터마다 적용하면 개별적으로 적용이 되니까 라우터마다 별도 세팅을 해준다.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});
// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

app.listen(80, () => {
  console.log("서버 실행 중!");
});
