/**
 * Create a new post
 * @param {Object} dataPost
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function createPost(
  dataPostToCreate,
  getAllPosts,
  setDataPosts,
  setDisplayPosts
) {
  try {
    await fetch("http://localhost:3000/api/post", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPostToCreate),
    });
    getAllPosts(setDataPosts, setDisplayPosts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createPost,
};
