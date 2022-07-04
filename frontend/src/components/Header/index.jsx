import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../assets/icon-left-font-monochrome-white.png";

import { disconnect } from "./function";
import { Nav, Container, Button } from "./style";

const Header = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  return (
    <Nav>
      <Container>
        <Link to="/feed">
          <img src={Logo} alt="logo" />
        </Link>

        <div>
          <Link to={"/edit_profile/" + userId}>
            <Button>
              <FontAwesomeIcon icon={faPenToSquare} size="2x" />

              <span>Editer le profil</span>
            </Button>
          </Link>

          <Button onClick={(e) => disconnect()}>
            <FontAwesomeIcon icon={faRightFromBracket} size="2x" />

            <span>Se déconnecter</span>
          </Button>
        </div>
      </Container>
    </Nav>
  );
};

export default Header;
