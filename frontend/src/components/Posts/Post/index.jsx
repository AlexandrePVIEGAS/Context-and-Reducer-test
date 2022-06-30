import { Container, Div, UserName } from "./style";

function Post({ post }) {
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
      {/* Name, message and date */}
      <Div>
        <div>
          <UserName>
            {post.users.lastName} {post.users.firstName}
          </UserName>
          <span>{post.message}</span>
        </div>
        <span>
          {Intl.DateTimeFormat("fr-FR", {
            dateStyle: "full",
            timeStyle: "short",
          }).format(new Date(post.createdAt))}
        </span>
      </Div>
    </Container>
  );
}

export default Post;
