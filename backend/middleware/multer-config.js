const multer = require("multer");

const MIME_TYPES_AVATAR = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/avatars");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.normalize().replace(/.[^/.]+$/, "");
    name = name.split(" ").join("_").toLowerCase();
    const extension = MIME_TYPES_AVATAR[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

const uploadAvatar = multer({
  storage: storageAvatar,
  limits: {
    fieldNameSize: 50,
    fileSize: 500000,
  },
  fileFilter: (req, file, callback) => {
    if (!MIME_TYPES_AVATAR[file.mimetype]) {
      callback(new Error("Le type d'image doit être un jpg, jpeg, ou png !"));
    } else {
      callback(null, true);
    }
  },
}).single("avatar");

module.exports = {
  uploadAvatar,
};
