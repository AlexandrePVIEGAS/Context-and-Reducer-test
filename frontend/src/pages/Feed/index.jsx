import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import Posts from "../../components/Posts";

import Header from "../../components/Header";
import Logo from "../../assets/icon-left-font-monochrome-black.png";
import { Button } from "../../utils/styles/button";
import color from "../../utils/styles/colors";

const ContainerFailed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoImg = styled.img`
  width: 90%;
  max-width: 1024px;
  margin-top: 10%;
`;
const PleaseLogin = styled.span`
  width: 90%;
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
`;

function Feed() {
  const [dataPosts, setDataPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState(true);
  const [imgSrc, setImgSrc] = useState("");

  return (
    <>
      {displayPosts ? (
        <div>
          <Header />
          <Posts setDisplayPosts={setDisplayPosts} />
        </div>
      ) : (
        <ContainerFailed>
          <LogoImg src={Logo} alt="Logo" />
          <PleaseLogin>Vous devez vous connecter/créer un compte pour utiliser le réseau social !</PleaseLogin>
        </ContainerFailed>
      )}
    </>
  );
}

export default Feed;
