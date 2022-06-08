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
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        profile_picture_url: req.body.profile_picture_url,
        biography: req.body.biography,
      },
    });
    res.status(200).json({ message: "User updated !" });
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
    res.status(200).json({ message: "User " + user.first_name + " " + user.last_name + " deleted !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
