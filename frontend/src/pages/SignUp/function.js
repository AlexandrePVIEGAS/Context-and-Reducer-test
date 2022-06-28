/**
 * Check the inputs
 * @param {Object} values
 * @returns {Object} errors
 */
function validate(values) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;
  const errors = {};
  if (!regexEmail.test(values.email)) {
    errors.email = "L'email n'est pas valide !";
  }
  if (!regexPassword.test(values.password)) {
    errors.password = "Le mot de passe doit faire au moins 8 caractères !";
  }
  return errors;
}

/**
 * Sign up
 * @param {Object} userSignup
 * @param {Boolean} setIsSubmit
 * @param {Boolean} setUserExist
 */
async function fetchData(userSignup, setIsSubmit, setUserExist) {
  try {
    const resultApi = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userSignup),
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
  validate,
  fetchData,
};
