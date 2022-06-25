import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../assets/icon-left-font-monochrome-white.png";

import { disconnect, fetchData } from "./function";
import { Nav, LogoImg, Container, ContainerLink, Button, Span, Img } from "./style";

const Header = () => {
  const id = JSON.parse(localStorage.getItem("userId"));

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    fetchData(id, setImgSrc);
  }, [id]);

  const handleDisconnect = () => {
    localStorage.clear();
    disconnect();
  };

  return (
    <Nav>
      <Container>
        <Link to="/feed">
          <LogoImg src={Logo} alt="logo" />
        </Link>
        <div style={{ display: "flex" }}>
          <Img src={`http://localhost:3000${imgSrc}`} alt="avatar" />
          <ContainerLink>
            <Link to={"/edit_profile/" + id} style={{ cursor: "default" }}>
              <Button>
                <FontAwesomeIcon icon={faPenToSquare} size="2x" />
                <Span>Editer le profil</Span>
              </Button>
            </Link>
            <Button onClick={handleDisconnect}>
              <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
              <Span>Se déconnecter</Span>
            </Button>
          </ContainerLink>
        </div>
      </Container>
    </Nav>
  );
};

export default Header;
