const { Router } = require("express");

const router = Router();

//(path, (req, res))
router.get("/", (req, res) => {
  res.send("Hello World !");
});

module.exports = router;
