import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoImg, SuccessOrError, SignUpForm, SignUpDiv, SignUpInput, ErrorMsg, SignUpButton, RedirectToLogin } from "./style";
import Logo from "../../assets/icon-left-font.svg";

function SignUp() {
  const [userSignup, setUserSignup] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userExist, setUserExist] = useState(false);

  const validate = (values) => {
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
  };

  async function fetchData() {
    if (Object.keys(formErrors).length === 0) {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userSignup),
        };
        await fetch("http://localhost:3000/api/auth/signup", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              setIsSubmit(true);
              setUserExist(false);
            } else {
              setIsSubmit(false);
              setUserExist(true);
            }
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignup({ ...userSignup, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(userSignup));
    fetchData();
  };

  return (
    <div>
      <div className="container">
        <LogoImg src={Logo} alt="logo" />
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <SuccessOrError success>Inscription réussie !</SuccessOrError>
        ) : null}
        {userExist ? <SuccessOrError error>Cet utilisateur existe déjà !</SuccessOrError> : null}
        <SignUpForm onSubmit={handleSubmit}>
          <SignUpDiv className="signup-form-input">
            <label htmlFor="lastName">Nom</label>
            <SignUpInput type="text" id="lastName" name="lastName" onChange={handleChange} required />
            <ErrorMsg>{formErrors.lastName}</ErrorMsg>
          </SignUpDiv>

          <SignUpDiv className="signup-form-input">
            <label htmlFor="firstName">Prénom</label>
            <SignUpInput type="text" id="firstName" name="firstName" onChange={handleChange} required />
            <ErrorMsg>{formErrors.firstName}</ErrorMsg>
          </SignUpDiv>

          <SignUpDiv className="signup-form-input">
            <label htmlFor="email">Email</label>
            <SignUpInput type="email" id="email" name="email" onChange={handleChange} required />
            <ErrorMsg>{formErrors.email}</ErrorMsg>
          </SignUpDiv>

          <SignUpDiv className="signup-form-input">
            <label htmlFor="password">Mot de passe</label>
            <SignUpInput type="password" id="password" name="password" onChange={handleChange} required />
            <ErrorMsg>{formErrors.password}</ErrorMsg>
          </SignUpDiv>

          <div className="signup-form-input">
            <SignUpButton type="submit">Créer un compte</SignUpButton>
          </div>
        </SignUpForm>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <Link to="/" style={{ textDecoration: "none" }}>
            <RedirectToLogin type="button">Retour à la page de connexion</RedirectToLogin>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default SignUp;
