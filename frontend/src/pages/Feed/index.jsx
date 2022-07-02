import { useState } from "react";

import Header from "../../components/Header";
import Posts from "../../components/Posts";
import Logo from "../../assets/icon-left-font-monochrome-black.png";

import { Container, Unauthorized } from "./style";

function Feed() {
  const [displayPosts, setDisplayPosts] = useState(true);

  return (
    <>
      {displayPosts ? (
        <Container>
          <Header />
          <Posts setDisplayPosts={setDisplayPosts} />
        </Container>
      ) : (
        <Unauthorized>
          <img src={Logo} alt="Logo" />
          <span>
            Vous devez vous connecter / créer un compte pour utiliser le réseau
            social !
          </span>
        </Unauthorized>
      )}
    </>
  );
}

export default Feed;
