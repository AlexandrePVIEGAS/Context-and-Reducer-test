const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a comment
const createComment = async (req, res, next) => {
  try {
    // Check if the request have an image, if yes, create the comment with the image
    if (req.file !== undefined) {
      const comment = await prisma.comments.create({
        data: {
          message: req.body.message,
          imageUrl: `/images/comments/${req.file.filename}`,
          user_id: Number(req.body.user_id),
          post_id: Number(req.body.post_id),
        },
        include: { users: true },
      });
      res
        .status(200)
        .json({ message: "Le commentaire " + comment.id + " a été créé !" });
    } else {
      // Create the comment without image
      const comment = await prisma.comments.create({
        data: {
          message: req.body.message,
          user_id: Number(req.body.user_id),
          post_id: Number(req.body.post_id),
        },
        include: { users: true },
      });
      res
        .status(200)
        .json({ message: "Le commentaire " + comment.id + " a été créé !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update a comment
const updateComment = async (req, res, next) => {
  try {
    // Check if the request have an image, if yes, update the comment with the image
    if (req.file !== undefined) {
      const comment = await prisma.comments.update({
        where: { id: Number(req.params.id) },
        data: {
          message: req.body.message,
          imageUrl: `/images/comments/${req.file.filename}`,
        },
        include: { users: true },
      });
      res
        .status(200)
        .json({ message: "Le commentaire " + comment.id + " a été modifié !" });
    } else {
      // Update the comment without image
      const comment = await prisma.comments.update({
        where: { id: Number(req.params.id) },
        data: { message: req.body.message },
        include: { users: true },
      });
      res
        .status(200)
        .json({ message: "Le commentaire " + comment.id + " a été modifié !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a comment
const deleteComment = async (req, res, next) => {
  try {
    const comment = await prisma.comments.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    // Check if the comment have an image, if yes, delete it from the server
    if (comment.imageUrl !== null) {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlinkSync(`images/${filename}`);
    }
    // Delete the comment
    await prisma.comments.delete({
      where: { id: Number(req.params.id) },
    });
    res
      .status(200)
      .json({ message: "Le commentaire " + comment.id + " a été surprimé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
