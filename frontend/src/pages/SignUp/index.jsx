import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/icon-left-font.png";
import { Img, SuccessOrError, Form, Div, Input, ErrorMsg } from "./style";
import { Button } from "../../utils/styles/button";

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
      <Link to="/">
        <Img src={Logo} alt="logo" />
      </Link>

      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <SuccessOrError success>Inscription réussie !</SuccessOrError>
      ) : null}

      {Object.keys(formErrors).length === 0 && userExist ? (
        <SuccessOrError error>Cet utilisateur existe déjà !</SuccessOrError>
      ) : null}

      <Form onSubmit={handleSubmit}>
        <Div>
          <label htmlFor="lastName">Nom</label>
          <Input type="text" id="lastName" name="lastName" onChange={handleChange} required />
          <ErrorMsg>{formErrors.lastName}</ErrorMsg>
        </Div>

        <Div>
          <label htmlFor="firstName">Prénom</label>
          <Input type="text" id="firstName" name="firstName" onChange={handleChange} required />
          <ErrorMsg>{formErrors.firstName}</ErrorMsg>
        </Div>

        <Div>
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" name="email" onChange={handleChange} required />
          <ErrorMsg>{formErrors.email}</ErrorMsg>
        </Div>

        <Div>
          <label htmlFor="password">Mot de passe</label>
          <Input type="password" id="password" name="password" onChange={handleChange} required />
          <ErrorMsg>{formErrors.password}</ErrorMsg>
        </Div>

        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button type="button" greyButton>
              Retour à la page de connexion
            </Button>
          </Link>
        ) : (
          <Div>
            <Button type="submit">Créer un compte</Button>
          </Div>
        )}
      </Form>
    </div>
  );
}

export default SignUp;
