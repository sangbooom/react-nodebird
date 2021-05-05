const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv")
const postRouter = require("./routes/post");
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

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json()); // 프론트에서 req에 post,put,patch로 넘겨주면 해석해준다.
app.use(express.urlencoded({ extended: true })); //form에서 submit하면 데이터가 인코딩된 형식으로 넘어간다.
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
app.use("/user", userRouter);

app.listen("3065", () => {
  console.log("서버 실행 중!!");
});
