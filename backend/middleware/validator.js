const { body, validationResult } = require("express-validator");

exports.signUp = [
  body("lastName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Le nom doit contenir que des lettres !")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères requis !"),
  body("firstName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Le prénom doit contenir que des lettres !")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères requis !"),
  body("email").isEmail().withMessage("Email invalide !").normalizeEmail(),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Le mot de passe doit faire minimum 8 caractères et doit contenir : 1 lettre MAJ, 1 lettre MIN, 1 chiffre et 1 caractère spécial !"
    ),
  (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

