import Logo from "../assets/icon-left-font.svg";
import "../styles/Signup.css";

function Login() {
  return (
    <div>
      <div className="container">
        <div className="login-container">
          <div className="login-logo">{/* <img src={Logo} alt="logo" /> */}</div>
          <div className="login-form">
            <form>
              <div className="login-form-input">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
              </div>
              <div className="login-form-input">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" />
              </div>
              <div className="login-form-input">
                <button type="submit">Se connecter</button>
              </div>
            </form>
          </div>
        </div>
        <div className="signup-container">
          <a href="">
            <button>S'inscrire</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
