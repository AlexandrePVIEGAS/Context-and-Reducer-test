const express = require("express");

const userCtrl = require("../controllers/user.controllers");
const check = require("../middleware/auth");
const upload = require("../middleware/multer-config");
const validate = require("../middleware/validator");

const router = express.Router();

// Get, Update, Delete a user
router.get("/:id", check.user, userCtrl.getUser);
router.put(
  "/:id",
  check.user,
  upload.avatar,
  validate.editProfile,
  userCtrl.updateUser
);
router.delete("/:id", check.user, userCtrl.deleteUser);

module.exports = router;
