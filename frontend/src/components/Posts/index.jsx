import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import LikeDelete from "./LikeDelete";
import Comments from "./Comments";

import { Button } from "../../utils/styles/button";

import { getAllPosts, createPost } from "./function";
import { Form, Container, Post, Avatar, Div } from "./style";

function Posts({ setDisplayPosts }) {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [dataPost, setDataPost] = useState({
    message: "",
    user_id: userId,
  });
  const [dataPosts, setDataPosts] = useState([]);

  useEffect(() => {
    getAllPosts(setDataPosts, setDisplayPosts);
  }, [setDisplayPosts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataPost({ ...dataPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(dataPost, getAllPosts, setDataPosts, setDisplayPosts);
  };

  return (
    <>
      {/* Submit Post */}
      <Form onSubmit={handleSubmit}>
        <textarea placeholder="Écrivez votre post ici..." name="message" maxLength="255" onChange={handleChange} />

        <div>
          <label htmlFor="imageUrl">
            <FontAwesomeIcon icon={faImage} size="2x" />
          </label>
          <input type="file" id="imageUrl" name="imageUrl" />
          <Button type="submit" smallButton>
            CRÉER UN POST
          </Button>
        </div>
      </Form>
      {dataPosts.map((post) => {
        return (
          <Container key={post.id}>
            <Post key={post.users.id}>
              {post.users.avatarUrl ? (
                <Avatar src={`http://localhost:3000${post.users.avatarUrl}`} alt="avatar" />
              ) : (
                <Avatar src={`http://localhost:3000/images/default.png`} alt="avatar" />
              )}
              <Div>
                <div>
                  <span style={{ marginBottom: "5px" }}>
                    {post.users.lastName} {post.users.firstName}
                  </span>
                  <span>{post.message}</span>
                </div>
                <span>
                  {Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(
                    new Date(post.createdAt)
                  )}
                </span>
              </Div>
            </Post>
            {/* Like & Delete button */}
            <LikeDelete
              dataPosts={dataPosts}
              getAllPosts={getAllPosts}
              setDataPosts={setDataPosts}
              setDisplayPosts={setDisplayPosts}
              post={post}
            />
            {/* Comments */}
            <Comments post={post} />
          </Container>
        );
      })}
    </>
  );
}

export default Posts;
