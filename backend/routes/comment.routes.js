const express = require("express");

const { createComment, deleteComment } = require("../controllers/comment.controllers");

const { cookieRequired } = require("../middleware/auth");

const router = express.Router();

// Post CRUD
router.post("/", cookieRequired, createComment);
router.delete("/:id", cookieRequired, deleteComment);

module.exports = router;
