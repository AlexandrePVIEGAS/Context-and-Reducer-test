const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get a user
const getUser = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update a user
const updateUser = async (req, res, next) => {
  try {
    if (req.file !== undefined && req.file !== null) {
      const user = await prisma.users.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      if (user.profilePicture !== null && user.profilePicture !== "") {
        const filename = user.profilePicture.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
      }
      await prisma.users.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          profilePicture: `/images/profilePictures/${req.file.filename}`,
        },
      });
    }
    const user = await prisma.users.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        biography: req.body.biography,
      },
    });
    res.status(200).json({ message: "Utilisateur " + user.lastName + " " + user.firstName + " mis à jour !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (user.profilePicture !== null && user.profilePicture !== "") {
      const filename = user.profilePicture.split("/images/")[1];
      fs.unlinkSync(`images/${filename}`);
    }
    const userToDelete = await prisma.users.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.clearCookie("Token");
    res.status(200).json({ message: "Utilisateur " + userToDelete.firstName + " " + userToDelete.lastName + " surprimé !" });
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
