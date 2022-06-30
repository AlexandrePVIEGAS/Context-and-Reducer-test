import styled from "styled-components";
import color from "../../../../utils/styles/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  textarea {
    height: 50px;
    padding: 5px;
    font-size: 16px;
    font-family: "Lato", sans-serif;
    outline: none;
    resize: none;
  }

  div {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;

    label {
      cursor: pointer;
      color: ${color.tertiary};
    }

    input {
      display: none;
    }

    button {
      margin-left: 10px;
    }
  }
`;
