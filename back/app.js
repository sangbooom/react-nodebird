const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

const app = express();
dotenv.config();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

app.use(morgan('dev'));
app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);
app.use(express.json()); // 프론트에서 req에 post,put,patch로 넘겨주면 해석해준다. axios에서 데이터 보낼떄
app.use(express.urlencoded({ extended: true })); //form에서 submit하면 데이터가 인코딩된 형식으로 넘어간다. 일반데이터로 보낼때

// 왜 앱에는 multer 적용 안할까? 어떤 폼에서는 image를 여러개 올릴것이고 어떤 폼에서는 텍스트를 올릴수도 있다. 멀티파트로 보낼수도 있다
// 앱에 장착하면 모든 라우터에 적용이 되고 라우터마다 적용하면 개별적으로 적용이 되니까 라우터마다 별도 세팅을 해준다.

app.use(cookieParser());
app.use(
  session({
    saveUninitialized: false,
    resabe: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("/");
});

app.use("/post", postRouter); // 분리
app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.listen("3065", () => {
  console.log("서버 실행 중!!");
});
