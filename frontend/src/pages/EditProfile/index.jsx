import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { Button } from "../../utils/styles/button";

import { fetchData, updateImg, updateData, deleteData } from "./function";
import { Container, Form, Img, Div, Input } from "./style";

function EditProfile() {
  const navigate = useNavigate();

  const { id } = useParams();

  const refLastName = useRef();
  const refFirstName = useRef();
  const refBiography = useRef();
  const refEmail = useRef();

  const [img, setImg] = useState();
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    fetchData(id, refLastName, refFirstName, refBiography, refEmail, setImgSrc);
  }, [id]);

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(id, refLastName, refFirstName, refBiography);
    updateImg(img, id, setImgSrc);
  };

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?") === true) {
      deleteData(id, navigate);
    } else {
      return;
    }
  };

  return (
    <Container>
      <Header />
      <Form onSubmit={handleSubmit}>
        <Img src={`http://localhost:3000${imgSrc}`} alt="avatar" />

        <Div>
          <label htmlFor="avatar">Modifier la photo de profil :</label>
          <Input type="file" id="avatar" name="avatar" onChange={handleImgChange} />
        </Div>

        <Div>
          <label htmlFor="lastName">Nom : </label>
          <Input type="text" id="lastName" name="lastName" ref={refLastName} />
        </Div>

        <Div>
          <label htmlFor="firstName">Prénom : </label>
          <Input type="text" id="firstName" name="firstName" ref={refFirstName} />
        </Div>

        <Div>
          <label htmlFor="biography">Bio : </label>
          <Input type="text" id="biography" name="biography" ref={refBiography} />
        </Div>

        <Div>
          <label htmlFor="email">Email : </label>
          <Input type="email" id="email" name="email" ref={refEmail} disabled />
        </Div>

        <Button type="submit">Enregistrer</Button>

        <Button type="button" onClick={handleDelete} greyButton>
          Supprimer le compte
        </Button>
      </Form>
    </Container>
  );
}

export default EditProfile;
