const express = require("express");

const { getAllPosts, getPost, createPost, deletePost, likePost } = require("../controllers/post.controllers");
const cookieRequired = require("../middleware/cookie-required");

const router = express.Router();

router.get("/", cookieRequired, getAllPosts);
router.get("/:id", cookieRequired, getPost);
router.post("/", cookieRequired, createPost);
router.delete("/:id", cookieRequired, deletePost);
router.post("/:id/like", cookieRequired, likePost);

module.exports = router;
