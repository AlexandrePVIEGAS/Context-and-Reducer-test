/**
 * Get all posts from the database
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function getAllPosts(setDataPosts, setDisplayPosts, refreshPosts) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/post", {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    if (!data.error) {
      setDataPosts(data.posts);
      refreshPosts(data.posts);
    } else {
      setDisplayPosts(false);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllPosts,
};
