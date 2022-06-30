import { useState } from "react";

import Message from "./Message";
import Buttons from "../Buttons";

import { Container, Div, NameAndDate, UserName } from "./style";

function Post({ post, setDataPosts, setDisplayPosts }) {
  const [editPost, setEditPost] = useState();

  return (
    <Container key={post.user_id}>
      {/* Avatar */}
      {post.users.avatarUrl ? (
        <img
          src={`http://localhost:3000${post.users.avatarUrl}`}
          alt="avatar"
        />
      ) : (
        <img src={`http://localhost:3000/images/default.png`} alt="avatar" />
      )}

      <Div>
        <NameAndDate>
          {/* Name */}
          <UserName>
            {post.users.firstName} {post.users.lastName}
          </UserName>

          {/* Date */}
          <span>
            {Intl.DateTimeFormat("fr-FR", {
              dateStyle: "full",
              timeStyle: "short",
            }).format(new Date(post.createdAt))}
          </span>
        </NameAndDate>

        {/* Message */}
        <Message
          post={post}
          setDataPosts={setDataPosts}
          setDisplayPosts={setDisplayPosts}
          editPost={editPost}
          setEditPost={setEditPost}
        />

        {/* Like & Delete button */}
        <Buttons
          post={post}
          setDataPosts={setDataPosts}
          setDisplayPosts={setDisplayPosts}
          editPost={editPost}
          setEditPost={setEditPost}
        />
      </Div>
    </Container>
  );
}

export default Post;
