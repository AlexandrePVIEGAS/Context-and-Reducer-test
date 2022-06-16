import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoImg, LoginForm, LoginDiv, LoginInput, ErrorMsg, LoginButton, SignUpButton } from "./style";
import Logo from "../../assets/icon-left-font.svg";

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
      if (process.env.REACT_APP_ENV === "DEV") {
        requestOptions.headers.Token = document.cookie;
      }
      await fetch("http://localhost:3000/api/auth/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (!data.email && !data.password) {
            navigate("/profil");
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
    <div>
      <div className="container">
        <LogoImg src={Logo} alt="logo" />
        <LoginForm onSubmit={handleSubmit}>
          <LoginDiv className="login-form-input">
            <label htmlFor="email">Email</label>
            <LoginInput type="email" id="email" name="email" onChange={handleChange} required />
            <ErrorMsg>{formErrors.email}</ErrorMsg>
          </LoginDiv>
          <LoginDiv className="login-form-input">
            <label htmlFor="password">Mot de passe</label>
            <LoginInput type="password" id="password" name="password" onChange={handleChange} required />
            <ErrorMsg>{formErrors.password}</ErrorMsg>
          </LoginDiv>
          <div className="login-form-input">
            <LoginButton type="submit">Se connecter</LoginButton>
          </div>
        </LoginForm>
      </div>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <SignUpButton type="button">Créer un compte</SignUpButton>
      </Link>
    </div>
  );
}

export default Login;
