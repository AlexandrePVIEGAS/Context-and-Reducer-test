import CreateComment from "./CreateComment";
import Comment from "./Comment";
import DeleteButton from "./DeleteButton";

function Comments({ post, setDataPosts, setDisplayPosts }) {
  return (
    <>
      {/* Create comment */}
      <CreateComment
        post={post}
        setDataPosts={setDataPosts}
        setDisplayPosts={setDisplayPosts}
      />

      {/* Display comments */}
      {post.comments.map((comment) => {
        return (
          <div key={comment.id}>
            {/* Comment */}
            <Comment comment={comment} />

            {/* Delete button */}
            <DeleteButton
              post={post}
              setDataPosts={setDataPosts}
              setDisplayPosts={setDisplayPosts}
              comment={comment}
            />
          </div>
        );
      })}
    </>
  );
}

export default Comments;
