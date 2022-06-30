import { Container } from "./style";

function Comment({ comment }) {
  return (
    <Container>
      {/* Avatar */}
      {comment.users.avatarUrl ? (
        <img
          src={`http://localhost:3000${comment.users.avatarUrl}`}
          alt="avatar"
        />
      ) : (
        <img src={`http://localhost:3000/images/default.png`} alt="avatar" />
      )}

      {/* Name, message and date */}
      <div key={comment.user_id}>
        <div>
          <span>
            {comment.users.firstName} {comment.users.lastName}
          </span>

          <p>{comment.message}</p>
        </div>

        <span>
          {Intl.DateTimeFormat("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
          }).format(new Date(comment.createdAt))}
        </span>
      </div>
    </Container>
  );
}

export default Comment;
