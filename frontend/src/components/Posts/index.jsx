import { useState, useEffect } from "react";

import CreatePost from "./CreatePost";
import Post from "./Post";
import Buttons from "./Buttons";
import Comments from "./Comments";

import { getAllPosts } from "./function";
import { Container } from "./style";

function Posts({ setDisplayPosts }) {
  const [dataPosts, setDataPosts] = useState([]);

  useEffect(() => {
    getAllPosts(setDataPosts, setDisplayPosts);
  }, [setDisplayPosts]);

  return (
    <>
      {/* Create a Post */}
      <CreatePost
        getAllPosts={getAllPosts}
        setDataPosts={setDataPosts}
        setDisplayPosts={setDisplayPosts}
      />

      {/* Display posts */}
      {dataPosts.map((post) => {
        return (
          <Container key={post.id}>
            {/* Post */}
            <Post post={post} />

            {/* Like & Delete button */}
            <Buttons
              post={post}
              dataPosts={dataPosts}
              getAllPosts={getAllPosts}
              setDataPosts={setDataPosts}
              setDisplayPosts={setDisplayPosts}
            />

            {/* Comments */}
            <Comments
              post={post}
              getAllPosts={getAllPosts}
              setDataPosts={setDataPosts}
              setDisplayPosts={setDisplayPosts}
            />
          </Container>
        );
      })}
    </>
  );
}

export default Posts;
