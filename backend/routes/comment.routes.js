const express = require("express");

const commentCtrl = require("../controllers/comment.controllers");
const check = require("../middleware/auth");
const validate = require("../middleware/validator");

const router = express.Router();

// Create, Update, Delete a comment
router.post("/", check.cookie, commentCtrl.createComment);
router.put(
  "/:id",
  check.cookie,
  check.authorComment,
  validate.message,
  commentCtrl.updateComment
);
router.delete(
  "/:id",
  check.cookie,
  check.authorComment,
  validate.message,
  commentCtrl.deleteComment
);

module.exports = router;
