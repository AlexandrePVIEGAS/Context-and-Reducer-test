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

module.exports = {
  getAllPosts,
  createPost,
};
