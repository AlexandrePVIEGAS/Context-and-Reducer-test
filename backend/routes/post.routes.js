const express = require("express");

const { getAllPosts, getPost, createPost, deletePost, likePost } = require("../controllers/post.controllers");

const { cookieRequired, verifyPost } = require("../middleware/auth");

const router = express.Router();

// Post CRUD
router.get("/", cookieRequired, getAllPosts);
router.get("/:id", cookieRequired, getPost);
router.post("/", cookieRequired, createPost);
router.delete("/:id", cookieRequired, verifyPost, deletePost);

// Like
router.post("/:id/like", cookieRequired, likePost);

module.exports = router;
