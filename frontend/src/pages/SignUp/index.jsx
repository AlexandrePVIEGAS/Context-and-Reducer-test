import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/icon-left-font.png";
import { Img, Form } from "../../utils/styles/Form";
import { Button } from "../../utils/styles/button";

import { validate, fetchData } from "./function";
import { Message } from "./style";

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
    fetchData(userSignup, setIsSubmit, setUserExist);
  };

  return (
    <div>
      <Link to="/">
        <Img src={Logo} alt="logo" />
      </Link>

      {Object.keys(formErrors).length === 0 && isSubmit ? <Message success>Inscription réussie !</Message> : null}

      {Object.keys(formErrors).length === 0 && userExist ? (
        <Message error>Cet utilisateur existe déjà !</Message>
      ) : null}

      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lastName">Nom</label>
          <input type="text" id="lastName" name="lastName" onChange={handleChange} required />
          <p>{formErrors.lastName}</p>
        </div>

        <div>
          <label htmlFor="firstName">Prénom</label>
          <input type="text" id="firstName" name="firstName" onChange={handleChange} required />
          <p>{formErrors.firstName}</p>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} required />
          <p>{formErrors.email}</p>
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" onChange={handleChange} required />
          <p>{formErrors.password}</p>
        </div>

        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button type="button" greyButton>
              Retour à la page de connexion
            </Button>
          </Link>
        ) : (
          <div>
            <Button type="submit">Créer un compte</Button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default SignUp;
