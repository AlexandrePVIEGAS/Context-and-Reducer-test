import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
// import { faThumbsUp as farFaThumbsUp } from "@fortawesome/free-regular-svg-icons";

import { getAllPosts } from "../function";
import { likePost, deletePost } from "./function";
import { Div } from "./style";

function Buttons({
  post,
  editPost,
  setEditPost,
  setDataPosts,
  setDisplayPosts,
}) {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleLike = (postId) => {
    likePost(postId, userId, getAllPosts, setDataPosts, setDisplayPosts);
  };

  const handleEdit = (postId) => {
    setEditPost(true);
  };

  const handleDelete = (postId) => {
    deletePost(postId, getAllPosts, setDataPosts, setDisplayPosts);
  };

  return (
    <Div container>
      <Div miniContainer>
        <div>
          {/* Like button */}
          <button onClick={() => handleLike(post.id)}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>

          {/* Number of likes */}
          <span>{post.likes.length}</span>
        </div>
        
        <div>
          {/* Edit button */}
          {editPost ? null : post.user_id === userId ||
            post.users.users_roles.role_id === 1 ? (
            <button onClick={() => handleEdit(post.id)}>
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
  );
}

export default Buttons;
