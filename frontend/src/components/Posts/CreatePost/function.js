/**
 * Create a new post
 * @param {Object} dataPost
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function createPost(
  dataPostToCreate,
  posts,
  refreshPosts
) {
  try {
    const apiCallRes = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPostToCreate),
    });
    const newPost = await apiCallRes.json();
    posts.push(newPost.post);
    refreshPosts(posts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createPost,
};
