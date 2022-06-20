const express = require("express");

const { getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/user.controllers");
const auth = require("../middleware/auth");
const { uploadProfilePicture } = require("../middleware/multer-config");

const router = express.Router();

router.get("/", auth, getAllUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, uploadProfilePicture, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
