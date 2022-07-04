import { useState } from "react";

import Header from "../../components/Header";
import EditProfileForm from "../../components/EditProfileForm";
import Unauthorized from "../../components/Unauthorized";

import { Container } from "./style";

function EditProfile() {
  const [displayPage, setDisplayPage] = useState(true);

  return (
    <>
      {displayPage ? (
        <Container>
          <Header />
          <EditProfileForm setDisplayPage={setDisplayPage} />
        </Container>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default EditProfile;
