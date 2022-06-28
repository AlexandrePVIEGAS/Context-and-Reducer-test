import styled from "styled-components";

export const Img = styled.img`
  display: block;
  width: 90%;
  max-width: 500px;
  margin: 150px auto;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;

  div {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 300px;

    input {
      height: 30px;
      font-size: 15px;
    }

    p {
      color: white;
      font-size: 20px;
      text-align: center;
      background-color: red;
    }
  }
`;
