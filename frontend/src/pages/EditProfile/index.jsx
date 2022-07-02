import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import { Button } from "../../utils/styles/button";

import { getUser, updateUser, deleteUser } from "./function";
import { Container } from "./style";

function EditProfile() {
  const { id } = useParams();

  const refFirstName = useRef();
  const refLastName = useRef();
  const refEmail = useRef();

  const [avatarFile, setAvatarFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    getUser(id, refFirstName, refLastName, refEmail, setImgSrc);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(avatarFile, id, refFirstName, refLastName, setImgSrc);
  };

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
      deleteUser(id);
    } else {
      return;
    }
  };

  return (
    <Container>
      <Header />
      <form onSubmit={handleSubmit}>
        <img src={`http://localhost:3000${imgSrc}`} alt="avatar" />

        <div>
          <label htmlFor="avatar">Modifier la photo de profil :</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
        </div>

        <div>
          <label htmlFor="firstName">Prénom : </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            ref={refFirstName}
          />
        </div>

        <div>
          <label htmlFor="lastName">Nom : </label>
          <input type="text" id="lastName" name="lastName" ref={refLastName} />
        </div>

        <div>
          <label htmlFor="email">Email : </label>
          <input type="email" id="email" name="email" ref={refEmail} disabled />
        </div>

        <Button type="submit">Enregistrer</Button>

        <Button type="button" onClick={handleDelete} greyButton>
          Supprimer le compte
        </Button>
      </form>
    </Container>
  );
}

export default EditProfile;
