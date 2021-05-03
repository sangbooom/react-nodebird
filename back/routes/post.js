const express = require("express");
const router = express.Router();

router.get("/post", (req, res) => { // /api/post
  res.json([
    { id: 1, content: "박상범" },
    { id: 2, content: "아이유" },
    { id: 3, content: "박한빈" },
  ]);
});

router.post("/post", (req, res) => {
  res.json([
    { id: 1, content: "박상범" },
    { id: 2, content: "아이유" },
    { id: 3, content: "박한빈" },
  ]);
});

router.delete("/post", (req, res) => {
  res.json({ id: 1 });
});

router.get("/asd", (req, res) => { // /api/asd
    res.json([
      { id: 1, content: "sss" },
      { id: 2, content: "zzz" },
    ]);
  });

module.exports = router;
