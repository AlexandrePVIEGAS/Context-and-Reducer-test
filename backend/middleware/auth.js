const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Check if the user is connected to the website
const cookieRequired = async (req, res, next) => {
  if (req.cookies.Token) {
    next();
  } else {
    res.status(403).json({
      error:
        "Vous devez créer un compte / vous connecter pour utiliser le réseau social !",
    });
  }
};

// Check if the user is allowed to receive/manage user's data
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.Token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (userId === 1 || userId === user.id) {
      next();
    } else {
      res.status(403).json({ error: "Utilisateur non autorisé" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Check if the user is allowed to manage post's data
const verifyPost = async (req, res, next) => {
  try {
    const token = req.cookies.Token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const post = await prisma.posts.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (userId === 1 || userId === post.user_id) {
      next();
    } else {
      res.status(403).json({ error: "Utilisateur non autorisé" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  cookieRequired,
  verifyUser,
  verifyPost,
};
