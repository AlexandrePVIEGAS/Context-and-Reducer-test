import styled from "styled-components";
import color from "../../utils/styles/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 700px;
  margin: 20px auto 0 auto;
  border: 1.5px solid ${color.tertiary};
  border-radius: 5px;

  textarea {
    height: 100px;
    width: 98%;
    margin: 1% auto 0 auto;
    font-size: 18px;
    font-family: "Lato", sans-serif;
    border: none;
    outline: none;
    resize: none;
    overflow: auto;
  }

  div {
    display: flex;
    justify-content: flex-end;
    width: 98%;
    margin: 0 auto 1% auto;
  }

  label {
    cursor: pointer;
    margin-right: 10px;
    color: ${color.tertiary};
  }

  input {
    display: none;
  }
`;
export const Container = styled.div`
  width: 90%;
  max-width: 1024px;
  margin: 20px auto 0 auto;
  padding: 10px;
  border: 1.5px solid ${color.tertiary};
  border-radius: 5px;

  ${({ comment }) =>
    comment && `margin: 0 auto; border: none; border-top: 1px solid ${color.tertiary}; border-radius: 0;`}
`;
export const Post = styled.div`
  display: flex;
`;
export const Avatar = styled.img`
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;

  ${({ comment }) => comment && `max-width: 40px;max-height: 40px;`}
`;
export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
`;
