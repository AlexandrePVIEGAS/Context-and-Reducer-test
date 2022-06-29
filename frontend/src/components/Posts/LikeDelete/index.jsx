import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { likePost, deletePost } from "./function";
import { Div } from "./style";

function LikeDelete({ dataPosts, getAllPosts, setDataPosts, setDisplayPosts, post }) {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const handleLike = (postId) => {
    likePost(dataPosts, postId, userId, getAllPosts, setDataPosts, setDisplayPosts);
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
            <span>{post.likes.length}</span>
          </div>
          {/* Delete button */}
          {post.users.id === userId || userId === 1 ? (
            <button onClick={() => handleDelete(post.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : null}
        </Div>
      </Div>
    </>
  );
}

export default LikeDelete;
