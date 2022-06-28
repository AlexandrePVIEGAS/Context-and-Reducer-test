/**
 * Get all posts from the database
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function getAllPosts(setDataPosts, setDisplayPosts) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/post", {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    if (!data.error) {
      setDataPosts(data.posts);
    } else {
      setDisplayPosts(false);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUser(userId, setImgSrc) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + userId, {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    console.log(data);
    if (!data.error) {
      data.user.avatarUrl ? setImgSrc(data.user.avatarUrl) : setImgSrc("/images/default.png");
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Create a new post
 * @param {Object} dataPost
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function createPost(dataPost, setDataPosts, setDisplayPosts) {
  try {
    await fetch("http://localhost:3000/api/post", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
    getAllPosts(setDataPosts, setDisplayPosts);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Like a post
 * @param {Array{}} dataPosts
 * @param {Number} idPost
 * @param {Number} userId
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function likePost(dataPosts, postId, userId, setDataPosts, setDisplayPosts) {
  const index = dataPosts.findIndex((post) => post.id === postId);
  if (index !== -1) {
    try {
      await fetch("http://localhost:3000/api/post/" + dataPosts[index].id + "/like", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          post_id: dataPosts[index].id,
        }),
      });
      getAllPosts(setDataPosts, setDisplayPosts);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("ID du post non trouvé");
  }
}

/**
 * Delete a post
 * @param {Array{}} dataPosts
 * @param {Number} idPost
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function deletePost(dataPosts, postId, setDataPosts, setDisplayPosts) {
  const index = dataPosts.findIndex((post) => post.id === postId);
  if (index !== -1) {
    try {
      await fetch("http://localhost:3000/api/post/" + dataPosts[index].id, {
        method: "DELETE",
        credentials: "include",
      });
      getAllPosts(setDataPosts, setDisplayPosts);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("ID du post non trouvé");
  }
}

module.exports = {
  getAllPosts,
  getUser,
  createPost,
  likePost,
  deletePost,
};
