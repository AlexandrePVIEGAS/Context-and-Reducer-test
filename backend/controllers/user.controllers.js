const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json({ users, message: "Tous les utilisateurs ont été récupérés !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get a user
const getUser = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({ user, message: "L'Utilisateur : " + user.id + " a été récupéré !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update a user
const updateUser = async (req, res, next) => {
  try {
    // Check if the request have an avatar, if yes
    if (req.file !== undefined) {
      const user = await prisma.users.findUnique({
        where: { id: Number(req.params.id) },
      });
      // Check if the user already have an avatar, if yes, delete it from the server
      if (user.avatarUrl !== null) {
        const filename = user.avatarUrl.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
      }
      // Update the user's avatar with the new one
      await prisma.users.update({
        where: { id: Number(req.params.id) },
        data: { avatarUrl: `/images/avatars/${req.file.filename}` },
      });
    }
    // Update the information of the user
    const user = await prisma.users.update({
      where: { id: Number(req.params.id) },
      data: {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
      },
    });
    res.status(200).json({ user, message: "L'Utilisateur " + user.id + " a été modifié !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
    });
    // Check if the user have an avatar, if yes, delete it from the server
    if (user.avatarUrl !== null) {
      const filename = user.avatarUrl.split("/images/")[1];
      fs.unlinkSync(`images/${filename}`);
    }
    // Delete the user
    await prisma.users.delete({
      where: { id: user.id },
    });
    res.clearCookie("Token");
    res.status(200).json({ user, message: "L'Utilisateur " + user.id + " a été surprimé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
