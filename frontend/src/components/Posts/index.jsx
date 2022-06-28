import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import color from "../../utils/styles/colors";

const Container = styled.div`
  width: 90%;
  max-width: 1024px;
  margin: 20px auto 0 auto;
  padding: 10px;
  border: 1.5px solid ${color.tertiary};
  border-radius: 5px;

  ${({ comment }) =>
    comment &&
    `margin: 0 auto;
  border: none; 
  border-top: 1px solid ${color.tertiary}; 
  border-radius: 0;`}
`;
const Post = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;

  ${({ comment }) =>
    comment &&
    `max-width: 40px;
  max-height: 40px;`}
`;
const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${({ divLikeDelete }) => divLikeDelete && `justify-content: flex-end;`}
  ${({ likeDelete }) => likeDelete && `width: 93.5%;`}

  button {
    cursor: pointer;
    color: ${color.primary};
    font-size: 20px;
    border: none;
    background: none;
    transition: 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

function Posts(dataPosts, handleLike, handleDelete, userId) {
  return dataPosts.map((post) => {
    return (
      <Container key={post.id}>
        <Post key={post.users.id}>
          {post.users.avatarUrl ? (
            <Avatar src={`http://localhost:3000${post.users.avatarUrl}`} alt="avatar" />
          ) : (
            <Avatar src={`http://localhost:3000/images/default.png`} alt="avatar" />
          )}
          <Div>
            <Message>
              <span style={{ marginBottom: "5px" }}>
                {post.users.lastName} {post.users.firstName}
              </span>
              <span>{post.message}</span>
            </Message>
            <span>
              {Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(new Date(post.createdAt))}
            </span>
          </Div>
        </Post>
        <Div divLikeDelete>
          <Div likeDelete>
            {/* Like button */}
            <div key={post.likes.id}>
              <button onClick={() => handleLike(post.id)}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <span>{post.likes.length}</span>
            </div>
            {post.users.id === userId || userId === 1 ? (
              <button onClick={() => handleDelete(post.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            ) : null}
          </Div>
        </Div>
      </Container>
    );
  });
}

export default Posts;
