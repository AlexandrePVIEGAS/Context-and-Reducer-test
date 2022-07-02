import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form } from "../../utils/styles/form";
import { Button } from "../../utils/styles/button";

import { fetchData } from "./function";

function LoginForm() {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(userEmail, userPassword, navigate, setFormErrors);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <p>{formErrors.email}</p>
      </div>

      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <p>{formErrors.password}</p>
      </div>

      <div>
        <Button type="submit">Se connecter</Button>
      </div>

      <div>
        <Link to="/signup">
          <Button type="button" greyButton>
            Créer un compte
          </Button>
        </Link>
      </div>
    </Form>
  );
}

export default LoginForm;
