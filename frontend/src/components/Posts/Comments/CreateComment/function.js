/**
 * Create a comment
 * @param {Object} dataComment
 * @param {Function} getAllPosts
 * @param {Function} setDataPosts
 * @param {Function} setDisplayPosts
 */
async function createComment(
  dataComment,
  getAllPosts,
  setDataPosts,
  setDisplayPosts
) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/comment", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataComment),
    });
    const data = await resultApi.json();
    if (!data.error) {
      getAllPosts(setDataPosts, setDisplayPosts);
    } else {
      console.log(data.error);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get the user's avatar
 * @param {Number} userId
 * @param {Function,} setImgSrc
 */
async function getUserAvatar(userId, setImgSrc) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + userId, {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    if (!data.error) {
      data.user.avatarUrl
        ? setImgSrc(data.user.avatarUrl)
        : setImgSrc("/images/default.png");
    } else {
      console.log(data.error);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createComment,
  getUserAvatar,
};
