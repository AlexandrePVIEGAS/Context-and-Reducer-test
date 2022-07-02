/**
 * Get the user's data
 * @param {Number} id
 * @param {Function} refFirstName
 * @param {Function} refLastName
 * @param {Function} refEmail
 * @param {Function} setImgSrc
 */
async function getUser(id, refFirstName, refLastName, refEmail, setImgSrc) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + id, {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    refFirstName.current.value = data.user.firstName;
    refLastName.current.value = data.user.lastName;
    refEmail.current.value = data.user.email;
    data.user.avatarUrl
      ? setImgSrc(data.user.avatarUrl)
      : setImgSrc("/images/default.png");
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update the user's data
 * @param {File} avatarFile
 * @param {Number} id
 * @param {Function} refFirstName
 * @param {Function} refLastName
 * @param {Function} setImgSrc
 */
async function updateUser(
  avatarFile,
  id,
  refFirstName,
  refLastName,
  setImgSrc
) {
  if (avatarFile !== null) {
    const formData = new FormData();
    formData.append("firstName", refFirstName.current.value);
    formData.append("lastName", refLastName.current.value);
    formData.append("avatar", avatarFile);
    try {
      const resultApi = await fetch("http://localhost:3000/api/user/" + id, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await resultApi.json();
      setImgSrc(data.user.avatarUrl);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await fetch("http://localhost:3000/api/user/" + id, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: refFirstName.current.value,
          lastName: refLastName.current.value,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * Delete a user
 * @param {Number} id
 * @param {Function} navigate
 */
async function deleteUser(id) {
  try {
    await fetch("http://localhost:3000/api/user/" + id, {
      method: "DELETE",
      credentials: "include",
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
