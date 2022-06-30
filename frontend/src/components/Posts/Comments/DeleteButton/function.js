/**
 * Delete a comment
 * @param {Array{}} post
 * @param {Number} commentId
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function deleteComment(
  post,
  commentId,
  getAllPosts,
  setDataPosts,
  setDisplayPosts
) {
  const index = post.comments.findIndex((comment) => comment.id === commentId);
  if (index !== -1) {
    try {
      await fetch(
        "http://localhost:3000/api/comment/" + post.comments[index].id,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      getAllPosts(setDataPosts, setDisplayPosts);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("ID du post non trouvé");
  }
}

module.exports = {
  deleteComment,
};
