import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../../utils/styles/button";

import { getAllPosts } from "../../function";
import { updatePost } from "./function";
import { Form, Div } from "./style";

function Message({
  post,
  setDataPosts,
  setDisplayPage,
  editPost,
  setEditPost,
}) {
  const [postMessage, setPostMessage] = useState(post.message);
  const [postImg, setPostImg] = useState(null);

  const handleSubmit = (postId) => {
    updatePost(
      postMessage,
      postImg,
      postId,
      getAllPosts,
      setDataPosts,
      setDisplayPage
    );
    setEditPost(false);
  };

  return (
    <>
      {editPost ? (
        <Form onSubmit={() => handleSubmit(post.id)}>
          {/* Message textarea */}
          <textarea
            value={postMessage}
            type={"text"}
            name="message"
            onChange={(e) => setPostMessage(e.target.value)}
          />

          {/* Image */}
          {post.imageUrl ? (
            <img src={`http://localhost:3000${post.imageUrl}`} alt="post" />
          ) : null}

          <div>
            {/* File input */}
            <label htmlFor="imageComment">
              <FontAwesomeIcon icon={faImage} size="2x" />
              <input
                type="file"
                id="imageComment"
                name="imageComment"
                onChange={(e) => setPostImg(e.target.files[0])}
              />
            </label>

            {/* Submit button */}
            <Button type="submit" smallButton>
              MODIFIER
            </Button>

            {/* Cancel button */}
            <Button type="button" onClick={() => setEditPost(false)} smallButton>
              ANNULER
            </Button>
          </div>
        </Form>
      ) : (
        <>
          {/* Message */}
          <p>{post.message}</p>
          {/* Image */}
          {post.imageUrl ? (
            <Div>
              <img src={`http://localhost:3000${post.imageUrl}`} alt="post" />
            </Div>
          ) : null}
        </>
      )}
    </>
  );
}

export default Message;
