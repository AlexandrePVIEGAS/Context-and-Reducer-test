const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        users: true,
        comments: { include: { users: true } },
        likes: { include: { users: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ posts, message: "Tous les posts ont été récupérés !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get a post
const getPost = async (req, res, next) => {
  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        users: true,
        comments: { include: { users: true } },
        likes: { include: { users: true } },
      },
    });
    res.status(200).json({ post, message: "Le post " + post.id + " a été récupéré !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Create a post
const createPost = async (req, res, next) => {
  try {
    // Check if the request have an image, if yes, create the post with the image
    if (req.file !== undefined) {
      const post = await prisma.posts.create({
        data: {
          message: req.body.message,
          imageUrl: `/images/posts/${req.file.filename}`,
          user_id: Number(req.body.user_id),
        },
        include: {
          users: true,
          comments: { include: { users: true } },
          likes: { include: { users: true } },
        },
      });
      res.status(200).json({ message: "Le post " + post.id + " a été créé !" });
    } else {
      // Create the post without image
      const post = await prisma.posts.create({
        data: {
          message: req.body.message,
          user_id: Number(req.body.user_id),
        },
        include: {
          users: true,
          comments: { include: { users: true } },
          likes: { include: { users: true } },
        },
      });
      res.status(200).json({ message: "Le post " + post.id + " a été créé !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a post
const deletePost = async (req, res, next) => {
  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    // Check if the post have an image, if yes, delete it from the server
    if (post.imageUrl !== null) {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlinkSync(`images/${filename}`);
    }
    // Delete the post
    await prisma.posts.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ message: "Le post " + post.id + " a été surprimé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Like a post
const likePost = async (req, res, next) => {
  try {
    const likeAlreadyExist = await prisma.likes.findFirst({
      where: {
        user_id: Number(req.body.user_id),
        post_id: Number(req.body.post_id),
      },
    });
    // Check if the user already liked the post, if not, create a like
    if (likeAlreadyExist === null) {
      await prisma.likes.create({
        data: {
          user_id: Number(req.body.user_id),
          post_id: Number(req.body.post_id),
        },
      });
      res.status(200).json({ message: "Le post a été liké !" });
    } else {
      // Delete the like
      await prisma.likes.deleteMany({
        where: {
          user_id: Number(req.body.user_id),
          post_id: Number(req.body.post_id),
        },
      });
      res.status(200).json({ message: "Le like a été supprimé !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
};
