import { useState, useEffect } from "react";
import { Button } from "../../../utils/styles/button";
import { getUser } from "./function";
import { FormComment, Container, Avatar } from "./style";

function Comments({ post }) {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    getUser(userId, setImgSrc);
  }, [userId]);

  return (
    <>
      <FormComment>
        <Avatar src={`http://localhost:3000${imgSrc}`} alt="avatar" comment />
        <input placeholder="Écrivez votre commentaire ici..." type="text" />
        <Button type="submit" smallButton>
          RÉPONDRE
        </Button>
      </FormComment>
      {post.comments.map((comment) => {
        return (
          <Container key={comment.id}>
            {comment.users.avatarUrl ? (
              <Avatar src={`http://localhost:3000${comment.users.avatarUrl}`} alt="avatar" />
            ) : (
              <Avatar src={`http://localhost:3000/images/default.png`} alt="avatar" />
            )}

            <span>
              {comment.users.lastName} {comment.users.firstName}
            </span>
            <p>{comment.message}</p>
          </Container>
        );
      })}
    </>
  );
}

export default Comments;
