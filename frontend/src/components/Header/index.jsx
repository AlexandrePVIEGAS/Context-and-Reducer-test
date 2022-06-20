// import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
`;

const EditProfil = () => {
  const { id } = useParams();

  async function disconnect() {
    try {
      const requestOptions = {
        method: "DELETE",
        credentials: "include",
      };
      await fetch("http://localhost:3000/api/auth/logout", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          window.location.reload();
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleDisconnect = () => {
    disconnect();
  }

  return (
    <Nav>
      <Link to={"/profile/" + id}>
        <button>Editer le profil</button>
      </Link>
      <Link to="/">
        <button type="button" onClick={handleDisconnect}>Se déconnecter</button>
      </Link>
    </Nav>
  );
};

export default EditProfil;
