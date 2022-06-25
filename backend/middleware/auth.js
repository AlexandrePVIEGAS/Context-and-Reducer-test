const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.Token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await prisma.users.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (userId !== user.id) {
      res.status(403).json({ error: "Utilisateur non autorisé" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
