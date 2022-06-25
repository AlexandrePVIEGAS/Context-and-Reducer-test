import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";

import { getAllPosts, createPost, likePost } from "./function";

const Container = styled.div`
  max-width: 1024px;
  margin: auto;
  margin-top: 20px;
  padding: 10px 0;
  border: 1px solid black;
  border-radius: 5px;
`;
const Profile = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  max-width: 50px;
  max-height: 50px;
`;
const Post = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

function Feed() {
  const id = JSON.parse(localStorage.getItem("userId"));

  const [dataPost, setDataPost] = useState({
    message: "",
    user_id: id,
  });
  const [dataPosts, setDataPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState(false);

  useEffect(() => {
    getAllPosts(setDataPosts, setDisplayPosts);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataPost({ ...dataPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(dataPost, setDataPosts, dataPosts);
  };

  const handleLike = (e) => {
    likePost(dataPosts, id, setDataPosts);
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <input type="text" id="message" name="message" onChange={handleChange}></input>
        <button type="submit">Envoyer</button>
      </form>
      {displayPosts
        ? dataPosts.map((post) => {
            return (
              <Container key={post.id}>
                <Profile>
                  <Avatar src={`http://localhost:3000${post.users.avatarUrl}`} alt="avatar" />
                  <Post>
                    <span style={{ marginBottom: "5px" }}>
                      {post.users.lastName} {post.users.firstName}
                    </span>
                    <span>{post.message}</span>
                  </Post>
                </Profile>
                <button id="like" name="like" onClick={handleLike}>
                  J'AIME
                </button>
                <span>{post.likes.length}</span>

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
          })
        : "Vous devez créer un compte pour utiliser le réseau social !"}
    </div>
  );
}

export default Feed;
