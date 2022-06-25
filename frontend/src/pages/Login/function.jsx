export async function fetchData(userLogin, setFormErrors, navigate) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    });
    const data = await resultApi.json();
    if (!data.email && !data.password) {
      localStorage.setItem("userId", JSON.stringify(data.userId));
      navigate("/feed");
    } else {
      setFormErrors(data);
    }
  } catch (error) {
    console.log(error);
  }
}
