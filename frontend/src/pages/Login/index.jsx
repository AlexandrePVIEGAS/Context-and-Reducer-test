import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/icon-left-font.png";
import { Button } from "../../utils/styles/button";
import { Img } from "../../utils/styles/logo";
import { ErrorMsg } from "../../utils/styles/errorMsg";

import { fetchData } from "./function";
import { Form, Input } from "./style";

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
    fetchData(userLogin, setFormErrors, navigate);
  };

  return (
    <div>
      <Img src={Logo} alt="logo" />

      <Form onSubmit={handleSubmit}>
        <div className="login-form-input">
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" name="email" onChange={handleChange} required />
          <ErrorMsg>{formErrors.email}</ErrorMsg>
        </div>

        <div className="login-form-input">
          <label htmlFor="password">Mot de passe</label>
          <Input type="password" id="password" name="password" onChange={handleChange} required />
          <ErrorMsg>{formErrors.password}</ErrorMsg>
        </div>

        <div className="login-form-input">
          <Button type="submit">Se connecter</Button>
        </div>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button type="button" greyButton>
            Créer un compte
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Login;
