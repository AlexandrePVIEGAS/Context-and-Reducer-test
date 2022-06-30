import { useState, useEffect } from "react";

import { Button } from "../../../../utils/styles/button";

import { getAllPosts } from "../../function";
import { createComment, getUserAvatar } from "./function";
import { Form } from "./style";

function CreateComment({ post, setDataPosts, setDisplayPosts }) {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [dataComment, setDataComment] = useState({
    message: "",
    user_id: userId,
    post_id: post.id,
  });
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    getUserAvatar(userId, setImgSrc);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataComment({ ...dataComment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(dataComment, getAllPosts, setDataPosts, setDisplayPosts);
  };

  return (
    <>
      {/* Create comment */}
      <Form onSubmit={handleSubmit}>
        <img src={`http://localhost:3000${imgSrc}`} alt="avatar" />

        <input
          placeholder="Écrivez votre commentaire ici..."
          type="text"
          name="message"
          onChange={handleChange}
        />

        <Button type="submit" smallButton>
          RÉPONDRE
        </Button>
      </Form>
    </>
  );
}

export default CreateComment;
