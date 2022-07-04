import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../utils/styles/button";

import { getAllPosts } from "../function";
import { createPost } from "./function";
import { Form } from "./style";

function CreatePost({ setDataPosts, setDisplayPage }) {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [postMessage, setPostMessage] = useState("");
  const [postImg, setPostImg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(
      postImg,
      postMessage,
      userId,
      getAllPosts,
      setDataPosts,
      setDisplayPage
    );
    setPostMessage("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* Message textarea */}
        <textarea
          placeholder="Écrivez votre post ici..."
          maxLength="255"
          value={postMessage}
          onChange={(e) => setPostMessage(e.target.value)}
          required
        />

        <div>
          {/* File input */}
          <label htmlFor="postImage">
            <FontAwesomeIcon icon={faImage} size="2x" />
            <input
              type="file"
              id="postImage"
              onChange={(e) => setPostImg(e.target.files[0])}
            />
          </label>

          {/* Submit button */}
          <Button type="submit" smallButton>
            CRÉER UN POST
          </Button>
        </div>
      </Form>
    </>
  );
}

export default CreatePost;
