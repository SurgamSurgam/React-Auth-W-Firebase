var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/unprotected", function(req, res, next) {
  console.log("bodybro:", req.body);
  const { id, email } = req.body;
  res.json(`Your ID: ${id} and your email: ${email}`);
});

router.post("/protected", function(req, res, next) {
  res.json("This is some sensitive data");
});

module.exports = router;
