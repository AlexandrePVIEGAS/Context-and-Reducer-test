import { useState, useEffect, useContext } from "react";

import { AppContext } from "../../contexts/AppContext";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Buttons from "./Buttons";
import Comments from "./Comments";

import { getAllPosts } from "./function";
import { Container } from "./style";

function Posts({ setDisplayPosts }) {
  // TODO get rid of posts local state
  const [dataPosts, setDataPosts] = useState([]);
  const [editPost, setEditPost] = useState();
  const {refreshPosts, posts} = useContext(AppContext);

  useEffect(() => {
    getAllPosts(setDataPosts, setDisplayPosts, refreshPosts);
  }, [setDisplayPosts]);

  return (
    <>
      {/* Create a Post */}
      <CreatePost />

      {/* Display posts */}
      {posts.map((post) => {
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
