async function getUser(userId, setImgSrc) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + userId, {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    console.log(data);
    if (!data.error) {
      data.user.avatarUrl ? setImgSrc(data.user.avatarUrl) : setImgSrc("/images/default.png");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUser,
};
