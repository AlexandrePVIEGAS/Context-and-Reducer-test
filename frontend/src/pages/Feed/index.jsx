import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTrash, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";
import Logo from "../../assets/icon-left-font-monochrome-black.png";
import { Button } from "../../utils/styles/button";
import color from "../../utils/styles/colors";

import { getAllPosts, getUser, createPost, likePost, deletePost } from "./function";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 700px;
  margin: 20px auto 0 auto;
  border: 1.5px solid ${color.tertiary};
  border-radius: 5px;

  textarea {
    height: 100px;
    width: 98%;
    margin: 1% auto 0 auto;
    font-size: 18px;
    font-family: "Lato", sans-serif;
    border: none;
    outline: none;
    resize: none;
    overflow: auto;
  }

  div {
    display: flex;
    justify-content: flex-end;
    width: 98%;
    margin: 0 auto 1% auto;
  }

  label {
    cursor: pointer;
    margin-right: 10px;
    color: ${color.tertiary};
  }

  input {
    display: none;
  }
`;
const Container = styled.div`
  width: 90%;
  max-width: 1024px;
  margin: 20px auto 0 auto;
  padding: 10px;
  border: 1.5px solid ${color.tertiary};
  border-radius: 5px;

  ${({ comment }) =>
  comment &&
  `margin: 0 auto;
  border: none; 
  border-top: 1px solid ${color.tertiary}; 
  border-radius: 0;`}
`;
const Post = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;

  ${({ comment }) =>
  comment &&
  `max-width: 40px;
  max-height: 40px;`}
`;
const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${({ divLikeDelete }) => divLikeDelete && `justify-content: flex-end;`}
  ${({ likeDelete }) => likeDelete && `width: 93.5%;`}

  button {
    cursor: pointer;
    color: ${color.primary};
    font-size: 20px;
    border: none;
    background: none;
    transition: 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
`;
const FormComment = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 20px 0; 
  padding-top: 20px;
  border-top: 1px solid ${color.tertiary};

  input {
    width: 100%;
    margin-left: 20px;
    font-size: 16px;
    border: none;
    outline: none;
  }
`;

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
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [dataPost, setDataPost] = useState({
    message: "",
    user_id: userId,
  });
  const [dataPosts, setDataPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState(true);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    getAllPosts(setDataPosts, setDisplayPosts);
    getUser(userId, setImgSrc);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataPost({ ...dataPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(dataPost, setDataPosts, setDisplayPosts);
  };

  const handleLike = (postId) => {
    likePost(dataPosts, postId, userId, setDataPosts, setDisplayPosts);
  };

  const handleDelete = (postId) => {
    deletePost(dataPosts, postId, setDataPosts, setDisplayPosts);
  };

  return (
    <div>
      {displayPosts ? (
        <div>
          <Header />
          {/* Submit Post */}
          <Form onSubmit={handleSubmit}>
            <textarea placeholder="Écrivez votre post ici..." name="message" maxLength="255" onChange={handleChange} />

            <div>
              <label htmlFor="imageUrl">
                <FontAwesomeIcon icon={faImage} size="2x" />
              </label>
              <input type="file" name="imageUrl" />
              <Button type="submit" smallButton>
                CRÉER UN POST
              </Button>
            </div>
          </Form>

          {/* Display posts */}
          {dataPosts.map((post) => {
            return (
              <Container key={post.id}>
                <Post key={post.users.id}>
                  {/* Avatar of the author of the post */}
                  {post.users.avatarUrl ? (
                    <Avatar src={`http://localhost:3000${post.users.avatarUrl}`} alt="avatar" />
                  ) : (
                    <Avatar src={`http://localhost:3000/images/default.png`} alt="avatar" />
                  )}

                  <Div>
                    {/* Name + Message */}
                    <Message>
                      <span style={{ marginBottom: "5px" }}>
                        {post.users.lastName} {post.users.firstName}
                      </span>
                      <span>{post.message}</span>
                    </Message>

                    {/* Date of the post */}
                    <span>
                      {Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(
                        new Date(post.createdAt)
                      )}
                    </span>
                  </Div>
                </Post>

                <Div divLikeDelete>
                  <Div likeDelete>
                    {/* Like button */}
                    <div key={post.likes.id}>
                      <button onClick={() => handleLike(post.id)}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </button>
                      <span>{post.likes.length}</span>
                    </div>

                    {/* Delete button */}
                    {post.users.id === userId || userId === 1 ? (
                      <button onClick={() => handleDelete(post.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    ) : null}
                  </Div>
                </Div>

                {/* Submit comment */}
                <FormComment>
                  <Avatar src={`http://localhost:3000${imgSrc}`} alt="avatar" comment />
                  <input type="text" placeholder="Écrivez votre commentaire ici..."></input>
                  <Button type="submit" smallButton>
                    RÉPONDRE
                  </Button>
                </FormComment>

                {/* Display comments */}
                {post.comments.map((comment) => {
                  return (
                    <Container key={comment.id} comment>
                      {comment.users.avatarUrl ? (
                        <Avatar src={`http://localhost:3000${comment.users.avatarUrl}`} alt="avatar" comment />
                      ) : (
                        <Avatar src={`http://localhost:3000/images/default.png`} alt="avatar" comment />
                      )}

                      <span>
                        {comment.users.lastName} {comment.users.firstName}
                      </span>
                      <p>{comment.message}</p>
                    </Container>
                  );
                })}
              </Container>
            );
          })}
        </div>
      ) : (
        <ContainerFailed>
          <LogoImg src={Logo} alt="Logo" />
          <PleaseLogin>Vous devez créer un compte pour utiliser le réseau social !</PleaseLogin>
        </ContainerFailed>
      )}
    </div>
  );
}

export default Feed;
