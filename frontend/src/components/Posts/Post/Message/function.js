async function updatePost(
  postId,
  updatePostData,
  getAllPosts,
  setDataPosts,
  setDisplayPosts
) {
  try {
    await fetch("http://localhost:3000/api/post/" + postId, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePostData),
    });
    getAllPosts(setDataPosts, setDisplayPosts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  updatePost,
};
