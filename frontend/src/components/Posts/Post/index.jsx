import Message from "./Message";

import { Container, Div, NameAndDate, UserName } from "./style";

function Post({ post, editPost, setEditPost, setDataPosts, setDisplayPosts }) {

  console.log(post);

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
          editPost={editPost}
          setEditPost={setEditPost}
          setDataPosts={setDataPosts}
          setDisplayPosts={setDisplayPosts}
        />
      </Div>
    </Container>
  );
}

export default Post;
