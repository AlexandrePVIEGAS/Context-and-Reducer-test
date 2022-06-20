import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoImg, Form, Input, ErrorMsg } from "./style";
import { Button } from "../../utils/styles/button";
import Logo from "../../assets/icon-left-font.png";

function Login() {
  let navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  async function fetchData() {
    try {
      const requestOptions = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      };
      await fetch("http://localhost:3000/api/auth/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (!data.email && !data.password) {
            navigate("/profile/" + data.userId);
          } else {
            setFormErrors(data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container">
      <LogoImg src={Logo} alt="logo" />

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
          <Button type="button" greyButton>Créer un compte</Button>
        </Link>
      </Form>
    </div>
  );
}

export default Login;
