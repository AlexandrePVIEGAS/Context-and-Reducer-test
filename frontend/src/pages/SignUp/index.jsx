import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/icon-left-font.png";
import { Button } from "../../utils/styles/button";
import { Img } from "../../utils/styles/logo";
import { ErrorMsg } from "../../utils/styles/errorMsg";

import { validate, fetchData } from "./function";
import { SuccessOrError, Form, Div, Input } from "./style";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignup({ ...userSignup, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(userSignup));
    fetchData(formErrors, userSignup, setIsSubmit, setUserExist);
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
