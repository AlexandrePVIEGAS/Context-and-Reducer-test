import { useState, useEffect } from "react";

import Button from "../../../../utils/styles/button";

import { getAllPosts } from "../../function";
import { createComment, getUserAvatar } from "./function";
import { Form } from "./style";

function CreateComment({ post, setDataPosts, setDisplayPage }) {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const postId = post.id;
  const [commentMessage, setCommentMessage] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    getUserAvatar(userId, setImgSrc);
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(
      commentMessage,
      userId,
      postId,
      getAllPosts,
      setDataPosts,
      setDisplayPage
    );
    setCommentMessage("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* Avatar */}
        <img src={`http://localhost:3000${imgSrc}`} alt="avatar" />

        {/* Message input */}
        <input
          type="text"
          placeholder="Écrivez votre commentaire ici..."
          maxLength="255"
          value={commentMessage}
          onChange={(e) => setCommentMessage(e.target.value)}
          required
        />

        {/* Submit button */}
        <Button type="submit" smallButton>
          RÉPONDRE
        </Button>
      </Form>
    </>
  );
}

export default CreateComment;
