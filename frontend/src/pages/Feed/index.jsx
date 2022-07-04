import { useState } from "react";

import Header from "../../components/Header";
import Posts from "../../components/Posts";
import Unauthorized from "../../components/Unauthorized";

import { Container } from "./style";

function Feed() {
  const [displayPage, setDisplayPage] = useState(true);

  return (
    <>
      {displayPage ? (
        <Container>
          <Header />
          <Posts setDisplayPage={setDisplayPage} />
        </Container>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default Feed;
