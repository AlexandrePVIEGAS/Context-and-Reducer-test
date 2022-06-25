export async function fetchData(id, refLastName, refFirstName, refBiography, refEmail, setImgSrc) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/user/" + id, {
      method: "GET",
      credentials: "include",
    });
    const data = await resultApi.json();
    refLastName.current.value = data.user.lastName;
    refFirstName.current.value = data.user.firstName;
    refBiography.current.value = data.user.biography;
    refEmail.current.value = data.user.email;
    if (data.user.avatarUrl === null) {
      setImgSrc("/images/default.png");
    } else {
      setImgSrc(data.user.avatarUrl);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateImg(img, id, setImgSrc) {
  const formData = new FormData();
  formData.append("avatar", img);
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
}

export async function updateData(id, refLastName, refFirstName, refBiography) {
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
        biography: refBiography.current.value,
      }),
    });
    alert("Vos informations ont été mises à jour !");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteData(id, navigate) {
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
