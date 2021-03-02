const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { UserController } = require("../controllers");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  UserController.signUp,
);

router.post(
  "/signin",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  UserController.signIn,
);

module.exports = router;
