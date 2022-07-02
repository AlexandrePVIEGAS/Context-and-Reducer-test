/**
 * Delete a comment
 * @param {Number} commentId
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function deleteComment(
  commentId,
  getAllPosts,
  setDataPosts,
  setDisplayPosts
) {
  try {
    await fetch("http://localhost:3000/api/comment/" + commentId, {
      method: "DELETE",
      credentials: "include",
    });
    getAllPosts(setDataPosts, setDisplayPosts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  deleteComment,
};
