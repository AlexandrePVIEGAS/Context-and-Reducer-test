/**
 * Receives the user's data
 * @param {Number} id
 * @param {Function} refLastName
 * @param {Function} refFirstName
 * @param {Function} refEmail
 * @param {Function} setImgSrc
 */
async function fetchData(id, refLastName, refFirstName, refEmail, setImgSrc) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + id, {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    refLastName.current.value = data.user.lastName;
    refFirstName.current.value = data.user.firstName;
    refEmail.current.value = data.user.email;
    data.user.avatarUrl ? setImgSrc(data.user.avatarUrl) : setImgSrc("/images/default.png");
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update the user's avatar
 * @param {File} img
 * @param {Number} id
 * @param {Function} setImgSrc
 */
async function updateAvatar(img, id, setImgSrc) {
  const formData = new FormData();
  formData.append("avatar", img);
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + id, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    const data = await resultApi.json();
    if (data.user.avatarUrl !== null) {
      setImgSrc(data.user.avatarUrl);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update the user's data
 * @param {Number} id
 * @param {Function} refLastName
 * @param {Function} refFirstName
 */
async function updateUser(id, refLastName, refFirstName) {
  try {
    await fetch("http://localhost:3000/api/user/" + id, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastName: refLastName.current.value,
        firstName: refFirstName.current.value,
      }),
    });
    alert("Vos informations ont été mises à jour !");
  } catch (error) {
    console.log(error);
  }
}

/**
 * Delete a user
 * @param {Number} id
 * @param {Function} navigate
 */
async function deleteUser(id, navigate) {
  try {
    await fetch("http://localhost:3000/api/user/" + id, {
      method: "DELETE",
      credentials: "include",
    });
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchData,
  updateAvatar,
  updateUser,
  deleteUser,
};
