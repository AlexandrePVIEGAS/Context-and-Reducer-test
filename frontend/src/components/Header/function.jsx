export async function fetchData(id, setImgSrc) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + id, {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    if (data.user.avatarUrl === null) {
      setImgSrc("/images/default.png");
    } else {
      setImgSrc(data.user.avatarUrl);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function disconnect() {
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
