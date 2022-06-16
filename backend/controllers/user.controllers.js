const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Update a user
const updateUser = async (req, res, next) => {
  try {
    const user = await prisma.users.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
        imageUrl: req.body.imageUrl,
        biography: req.body.biography,
      },
    });
    res.status(200).json({ message: "Utilisateur mis à jour !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  try {
    const user = await prisma.users.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.clearCookie("Cookies have been deleted");
    res.status(200).json({ message: "Utilisateur " + user.firstName + " " + user.lastName + " surprimé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
