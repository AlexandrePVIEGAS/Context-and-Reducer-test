/**
 * Like a post
 * @param {Array{}} dataPosts
 * @param {Number} idPost
 * @param {Number} userId
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function likePost(dataPosts, postId, userId, getAllPosts, setDataPosts, setDisplayPosts) {
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
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function deletePost(dataPosts, postId, getAllPosts, setDataPosts, setDisplayPosts) {
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
  likePost,
  deletePost,
};
