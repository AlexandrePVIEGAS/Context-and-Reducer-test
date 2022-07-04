/**
 * Update the post content
 * @param {String} postMessage 
 * @param {File} postImg 
 * @param {Number} postId 
 * @param {Function} getAllPosts 
 * @param {Function} setDataPosts 
 * @param {Function} setDisplayPage 
 */
async function updatePost(
  postMessage,
  postImg,
  postId,
  getAllPosts,
  setDataPosts,
  setDisplayPage
) {
  if (postImg !== null) {
    const formData = new FormData();
    formData.append("message", postMessage);
    formData.append("imageUrl", postImg);
    try {
      await fetch("http://localhost:3000/api/post/" + postId, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      getAllPosts(setDataPosts, setDisplayPage);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await fetch("http://localhost:3000/api/post/" + postId, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: postMessage }),
      });
      getAllPosts(setDataPosts, setDisplayPage);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  updatePost,
};
