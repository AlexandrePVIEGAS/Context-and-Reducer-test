import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../../../utils/styles/button";

import { getAllPosts } from "../../function";
import { updatePost } from "./function";
import { Form } from "./style";

function Message({
  post,
  setDataPosts,
  setDisplayPosts,
  editPost,
  setEditPost
}) {

  const [updatePostData, setUpdatePostData] = useState({
    message: "",
    // imageUrl : ,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatePostData({ ...updatePostData, [name]: value });
  };

  const handleSubmit = (postId) => {
    updatePost(
      postId,
      updatePostData,
      getAllPosts,
      setDataPosts,
      setDisplayPosts
    );
    setEditPost(false);
  };

  return (
    <>
      {editPost ? (
        <Form onSubmit={() => handleSubmit(post.id)}>
          <textarea
            defaultValue={post.message}
            type={"text"}
            name="message"
            onChange={handleChange}
          />

          <div>
            <label htmlFor="imageUrl">
              <FontAwesomeIcon icon={faImage} size="2x" />
            </label>

            <input type="file" id="imageUrl" name="imageUrl" />

            <Button type="submit" smallButton>
              MODIFIER
            </Button>

            <Button type="click" onClick={() => setEditPost(false)} smallButton>
              ANNULER
            </Button>
          </div>
        </Form>
      ) : (
        <p>{post.message}</p>
      )}
    </>
  );
}

export default Message;
