import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";
import Logo from "../../assets/icon-left-font-monochrome-black.png";
import {Button} from "../../utils/styles/button";
// import color from "../../utils/styles/colors";

import { getAllPosts, createPost, likePost, deletePost } from "./function";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 700px;
  margin: 20px auto 0 auto;
  border: 1px solid black;
  border-radius: 5px;

  textarea {
    height: 100px;
    width: 98%;
    margin: 1% auto 0 auto;
    font-size: 18px;
    border: none;
    outline: none;
    resize: none;
    overflow: auto;
  }

  div {
    display: flex;
    justify-content: space-between;
    width: 98%;
    margin: 0 auto 1% auto;
  }
`;
const Container = styled.div`
  max-width: 1024px;
  margin: 20px auto 0 auto;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
`;
const Post = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
`;
const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const FormComment = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid black;

  input {
    width: 100%;
    font-size: 16px;
    outline: none;
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

  useEffect(() => {
    getAllPosts(setDataPosts, setDisplayPosts);
  }, []);

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
            <textarea id="message" name="message" maxLength="255" onChange={handleChange} />
            <div>
              <input type="file"></input>
              <Button type="submit" smallButton>CRÉER UN POST</Button>
            </div>
          </Form>
          {/* Display posts */}
          {dataPosts.map((post) => {
            return (
              <Container key={post.id}>
                {/* Profile information of the author of the post */}
                <Post key={post.users.id}>
                  {post.users.avatarUrl ? (
                    <Avatar src={`http://localhost:3000${post.users.avatarUrl}`} alt="avatar" />
                  ) : (
                    <Avatar src={`http://localhost:3000/images/default.png`} alt="avatar" />
                  )}
                  <Div>
                    <Message>
                      <span style={{ marginBottom: "5px" }}>
                        {post.users.lastName} {post.users.firstName}
                      </span>
                      <span>{post.message}</span>
                    </Message>
                    <span>
                      {Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(
                        new Date(post.createdAt)
                      )}
                    </span>
                  </Div>
                </Post>
                <Div>
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
                {/* Submit comment */}
                <FormComment>
                  <input type="text"></input>
                  <Button type="submit" smallButton>RÉPONDRE</Button>
                </FormComment>
                {/* Display comments */}
                {post.comments.map((comment) => {
                  return (
                    <Container key={comment.id}>
                      <span>
                        {comment.users.lastName} {comment.users.firstName}
                      </span>
                      <p>Commentaire : {comment.message}</p>
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
