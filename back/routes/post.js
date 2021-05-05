const express = require("express");
const router = express.Router();

router.get("/", (req, res) => { // /api/post
  res.json([
    { id: 1, content: "박상범" },
    { id: 2, content: "아이유" },
    { id: 3, content: "박한빈" },
  ]);
});

router.post("/", (req, res) => {
  res.json([
    { id: 1, content: "박상범" },
    { id: 2, content: "아이유" },
    { id: 3, content: "박한빈" },
  ]);
});

router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
