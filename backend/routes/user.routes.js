const express = require("express");

const { getUser, updateUser, deleteUser } = require("../controllers/user.controllers");

const { verifyUser } = require("../middleware/auth");
const { uploadAvatar } = require("../middleware/multer-config");

const router = express.Router();

// User CRUD
router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyUser, uploadAvatar, updateUser);
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
