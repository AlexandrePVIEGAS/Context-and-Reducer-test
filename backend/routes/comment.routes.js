const express = require("express");

const commentCtrl = require("../controllers/comment.controllers");
const check = require("../middleware/auth");

const router = express.Router();

// Post CRUD
router.post("/", check.cookie, commentCtrl.createComment);
router.put("/:id", check.cookie, check.comment, commentCtrl.updateComment);
router.delete("/:id", check.cookie, check.comment, commentCtrl.deleteComment);

module.exports = router;
