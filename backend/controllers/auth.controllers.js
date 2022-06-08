const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Sign up
const signUp = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
    });
    if (user !== null) {
      res.status(302).json({ error: "User found with this email" });
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = await prisma.users.create({
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
        },
      });
      const userRole = await prisma.users_roles.create({
        data: {
          user_id: user.id,
          role_id: 2,
        },
      });
      res.status(200).json({
        message: "User created",
        userId: user.id,
        role: userRole.role_id,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
    });
    if (user === null) {
      res.status(404).json({ error: "User not found with this email" });
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        res.status(404).json({ error: "Incorrect password" });
      } else {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.cookie("Token", token);
        res.status(200).json({
          userId: user.id,
          token: token,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Logout
const logout = (req, res, next) => {
  res.clearCookie("Cookies have been deleted");
  return res.redirect("/signup");
};

module.exports = {
  signUp,
  login,
  logout,
};
