import { useState, useEffect } from "react";

import CreatePost from "./CreatePost";
import Post from "./Post";
import Buttons from "./Buttons";
import Comments from "./Comments";

import { getAllPosts } from "./function";
import { Container } from "./style";

function Posts({ setDisplayPosts }) {
  const [dataPosts, setDataPosts] = useState([]);
  const [editPost, setEditPost] = useState();

  useEffect(() => {
    getAllPosts(setDataPosts, setDisplayPosts);
  }, [setDisplayPosts]);

  return (
    <>
      {/* Create a Post */}
      <CreatePost
        setDataPosts={setDataPosts}
        setDisplayPosts={setDisplayPosts}
      />

      {/* Display posts */}
      {dataPosts.map((post) => {
        return (
          <Container key={post.id}>
            {/* Post */}
            <Post
              post={post}
              editPost={editPost}
              setEditPost={setEditPost}
              setDataPosts={setDataPosts}
              setDisplayPosts={setDisplayPosts}
            />

            {/* Like & Delete button */}
            <Buttons
              post={post}
              editPost={editPost}
              setEditPost={setEditPost}
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
