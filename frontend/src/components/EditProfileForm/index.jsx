import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "../../utils/styles/button";

import { getUser, updateUser, deleteUser } from "./function";

function EditProfileForm({ setDisplayPage }) {
  const { id } = useParams();
  const refFirstName = useRef();
  const refLastName = useRef();
  const refEmail = useRef();
  const [avatarFile, setAvatarFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    getUser(id, refFirstName, refLastName, refEmail, setImgSrc, setDisplayPage);
  }, [id, setDisplayPage]);

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
    <form onSubmit={handleSubmit}>
      <img src={`http://localhost:3000${imgSrc}`} alt="avatar" />

      <div>
        <label htmlFor="avatar">Modifier la photo de profil :</label>
        <input
          type="file"
          id="avatar"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
      </div>

      <div>
        <label htmlFor="firstName">Prénom : </label>
        <input
          type="text"
          maxLength={40}
          id="firstName"
          ref={refFirstName}
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">Nom : </label>
        <input
          type="text"
          maxLength={40}
          id="lastName"
          ref={refLastName}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email : </label>
        <input type="email" id="email" ref={refEmail} disabled />
      </div>

      <Button type="submit">Enregistrer</Button>

      <Button type="button" onClick={handleDelete} greyButton>
        Supprimer le compte
      </Button>
    </form>
  );
}

export default EditProfileForm;
