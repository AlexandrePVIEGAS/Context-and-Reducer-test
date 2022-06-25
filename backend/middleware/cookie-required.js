module.exports = async (req, res, next) => {
  if (!req.cookies.Token) {
    res.status(403).json({ error: "Vous devez créer un compte pour utiliser le réseau social !" });
  } else {
    next();
  }
};
