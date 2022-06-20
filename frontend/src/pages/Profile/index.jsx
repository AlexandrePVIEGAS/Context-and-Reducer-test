import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import { Button } from "../../utils/styles/button";

const From = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  padding-top: 100px;
  font-size: 20px;
`;
const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin-bottom: 30px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Input = styled.input`
  height: 30px;
  font-size: 15px;
`;

function Profile() {
  const navigate = useNavigate();

  const { id } = useParams();

  const refLastName = useRef();
  const refFirstName = useRef();
  const refEmail = useRef();

  const [img, setImg] = useState();
  const [imgSrc, setImgSrc] = useState("");

  async function updateImg() {
    const formData = new FormData();
    formData.append("profilePicture", img);

    try {
      const requestOptions = {
        method: "PUT",
        credentials: "include",
        body: formData,
      };
      await fetch("http://localhost:3000/api/profile/" + id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const requestOptions = {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastName: refLastName.current.value,
          firstName: refFirstName.current.value,
        }),
      };
      await fetch("http://localhost:3000/api/profile/" + id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteData() {
    try {
      const requestOptions = {
        method: "DELETE",
        credentials: "include",
      };
      await fetch("http://localhost:3000/api/profile/" + id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          navigate("/");
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch("http://localhost:3000/api/profile/" + id, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            refLastName.current.value = data.user.lastName;
            refFirstName.current.value = data.user.firstName;
            refEmail.current.value = data.user.email;
            if (data.user.profilePicture === null) {
              setImgSrc("/images/default.png");
            } else {
              setImgSrc(data.user.profilePicture);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData();
    updateImg();
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const handleDelete = (e) => {
    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?") === true) {
      deleteData();
    } else {
      return;
    }
  };

  return (
    <div>
      <Header />
      <From onSubmit={handleSubmit}>
        <Img src={`http://localhost:3000${imgSrc}`} alt="profile_picture" />

        <Div>
          <label htmlFor="profilePicture">Modifier la photo de profil :</label>
          <Input type="file" id="profilePicture" name="profilePicture" onChange={handleImgChange} />
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
          <label htmlFor="email">Email : </label>
          <Input type="email" id="email" name="email" ref={refEmail} disabled />
        </Div>

        <Button type="submit">Enregistrer</Button>

        <Button type="button" onClick={handleDelete} greyButton>Supprimer le compte</Button>
      </From>
    </div>
  );
}

export default Profile;
