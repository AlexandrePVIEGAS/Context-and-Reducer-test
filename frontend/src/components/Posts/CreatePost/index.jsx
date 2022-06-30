import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../../utils/styles/button";

import { AppContext } from "../../../contexts/AppContext";
import { getAllPosts } from "../function";
import { createPost } from "./function";
import { Form } from "./style";

function CreatePost() {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const {posts, refreshPosts} = useContext(AppContext);

  const [dataPostToCreate, setDataPostToCreate] = useState({
    message: "",
    user_id: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataPostToCreate({ ...dataPostToCreate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(dataPostToCreate, posts, refreshPosts);
  };

  return (
    <>
      {/* Submit Post */}
      <Form onSubmit={handleSubmit}>
        <textarea
          placeholder="Écrivez votre post ici..."
          name="message"
          maxLength="255"
          onChange={handleChange}
        />

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
    </>
  );
}

export default CreatePost;
