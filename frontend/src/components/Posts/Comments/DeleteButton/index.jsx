import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { deleteComment } from "./function";
import { Container } from "./style";

function DeleteButton({
  post,
  getAllPosts,
  setDataPosts,
  setDisplayPosts,
  comment,
}) {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleDelete = (commentId) => {
    deleteComment(post, commentId, getAllPosts, setDataPosts, setDisplayPosts);
  };

  return (
    <Container>
      {comment.user_id === userId || userId === 1 ? (
        <button onClick={() => handleDelete(comment.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      ) : null}
    </Container>
  );
}

export default DeleteButton;
