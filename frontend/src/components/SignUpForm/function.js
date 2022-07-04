async function sendSignUpData(
  userFirstName,
  userLastName,
  userEmail,
  userPassword,
  setIsSubmit,
  setUserExist
) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
      }),
    });
    const data = await resultApi.json();
    if (!data.error) {
      setIsSubmit(true);
      setUserExist(false);
    } else {
      setIsSubmit(false);
      setUserExist(true);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendSignUpData,
};
