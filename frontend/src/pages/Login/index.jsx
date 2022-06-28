import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/icon-left-font.png";
import { Img, Form } from "../../utils/styles/Form";
import { Button } from "../../utils/styles/button";

import { fetchData } from "./function";

function Login() {
  let navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(userLogin, navigate, setFormErrors);
  };

  return (
    <div>
      <Img src={Logo} alt="logo" />

      <Form onSubmit={handleSubmit}>
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

        <div>
          <Button type="submit">Se connecter</Button>
        </div>

        <div>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button type="button" greyButton>
              Créer un compte
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
