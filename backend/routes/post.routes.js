const express = require("express");

const postCtrl = require("../controllers/post.controllers");
const check = require("../middleware/auth");
const upload = require("../middleware/multer-config");

const router = express.Router();

// Post CRUD
router.get("/", check.cookie, postCtrl.getAllPosts);
router.post("/", check.cookie, upload.postImage, postCtrl.createPost);
router.put("/:id", check.cookie, check.post, upload.postImage, postCtrl.updatePost);
router.delete("/:id", check.cookie, check.post, postCtrl.deletePost);

// Like
router.post("/:id/like", check.cookie, postCtrl.likePost);

module.exports = router;
