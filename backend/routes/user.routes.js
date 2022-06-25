const express = require("express");

const { getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/user.controllers");
const auth = require("../middleware/auth");
const { uploadAvatar } = require("../middleware/multer-config");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, uploadAvatar, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
