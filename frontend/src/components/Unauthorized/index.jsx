import Logo from "../../assets/icon-left-font-monochrome-black.png";

import { Container } from "./style";

function Unauthorized() {
  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <span>
        Vous devez vous connecter / créer un compte pour utiliser le réseau
        social !
      </span>
    </Container>
  );
}

export default Unauthorized;
