const express = require("express");

const { getAllPosts, createPost, deletePost, likePost } = require("../controllers/post.controllers");

const { cookieRequired, verifyPost } = require("../middleware/auth");

const router = express.Router();

// Post CRUD
router.get("/", cookieRequired, getAllPosts);
router.post("/", cookieRequired, createPost);
router.delete("/:id", cookieRequired, verifyPost, deletePost);

// Like
router.post("/:id/like", cookieRequired, likePost);

module.exports = router;
