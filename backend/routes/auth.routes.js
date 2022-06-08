const express = require("express");

const { signUp, login, logout } = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
