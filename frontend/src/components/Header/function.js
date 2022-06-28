/**
 * Receives the user's avatar
 * @param {Number} userId
 * @param {Function} setImgSrc
 */
async function fetchData(userId, setImgSrc) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + userId, {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    if (!data.error) {
      data.user.avatarUrl ? setImgSrc(data.user.avatarUrl) : setImgSrc("/images/default.png");
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Disconnect the user
 */
async function disconnect() {
  try {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "DELETE",
      credentials: "include",
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchData,
  disconnect,
};
