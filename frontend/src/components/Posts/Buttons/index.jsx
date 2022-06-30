import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
// import { faThumbsUp as farFaThumbsUp } from "@fortawesome/free-regular-svg-icons";

import { likePost, deletePost } from "./function";
import { Div } from "./style";

function Buttons({
  post,
  dataPosts,
  getAllPosts,
  setDataPosts,
  setDisplayPosts,
}) {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleLike = (postId) => {
    likePost(
      dataPosts,
      postId,
      userId,
      getAllPosts,
      setDataPosts,
      setDisplayPosts
    );
  };

  const handleDelete = (postId) => {
    deletePost(dataPosts, postId, getAllPosts, setDataPosts, setDisplayPosts);
  };

  return (
    <>
      <Div container>
        <Div miniContainer>
          {/* Like button */}
          <div key={post.likes.id}>
            <button onClick={() => handleLike(post.id)}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            {/* Number of likes */}
            <span>{post.likes.length}</span>
          </div>
          <div>
            {/* Edit button */}
            {post.user_id === userId || post.users.users_roles.role_id === 1 ? (
              <button>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            ) : null}
            {/* Delete button */}
            {post.user_id === userId || post.users.users_roles.role_id === 1 ? (
              <button onClick={() => handleDelete(post.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            ) : null}
          </div>
        </Div>
      </Div>
    </>
  );
}

export default Buttons;
