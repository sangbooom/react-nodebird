const express = require("express");
const postRouter = require("./routes/post");
const db = require("./models");

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("/");
});

app.use("/api", postRouter); // 분리

app.listen("3065", () => {
  console.log("서버 실행 중");
});
