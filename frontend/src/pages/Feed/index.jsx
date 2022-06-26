import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";

import { getAllPosts, createPost, likePost, deletePost } from "./function";

const InputPost = styled.input`
  display: flex;
  max-width: 1024px;
  margin: 0 auto;
  padding: 100px;
`;
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
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [dataPost, setDataPost] = useState({
    message: "",
    user_id: userId,
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
    createPost(dataPost, setDataPosts, setDisplayPosts, setDataPost);
  };

  const handleLike = (idPost) => {
    likePost(dataPosts, userId, setDataPosts, setDisplayPosts, idPost);
  };

  const handleDelete = (idPost) => {
    deletePost(dataPosts, setDataPosts, setDisplayPosts, idPost);
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <InputPost type="text" id="message" name="message" onChange={handleChange} />
        <button type="submit">Envoyer</button>
      </form>
      {displayPosts
        ? dataPosts.map((post) => {
            return (
              <Container key={post.id}>
                <Profile key={post.users.id}>
                  {post.users.avatarUrl ? (
                    <Avatar src={`http://localhost:3000${post.users.avatarUrl}`} alt="avatar" />
                  ) : (
                    <Avatar src={`http://localhost:3000/images/default.png`} alt="avatar" />
                  )}
                  <Post>
                    <span style={{ marginBottom: "5px" }}>
                      {post.users.lastName} {post.users.firstName}
                    </span>
                    <span>{post.message}</span>
                  </Post>
                  <span>{post.updatedAt}</span>
                </Profile>
                <div key={post.likes.id}>
                  <button onClick={() => handleLike(post.id)}>J'AIME</button>
                  <span>{post.likes.length}</span>
                </div>
                <button onClick={() => handleDelete(post.id)}>Supprimer</button>
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
