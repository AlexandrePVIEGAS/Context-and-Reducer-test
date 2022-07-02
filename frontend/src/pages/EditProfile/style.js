import styled from "styled-components";
import color from "../../utils/styles/colors";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${color.secondary};

  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 500px;
    margin: 100px auto 0 auto;
    font-size: 20px;

    @media (max-width: 768px) {
      margin-top: 30px;
    }

    img {
      max-width: 200px;
      max-height: 200px;
      margin-bottom: 30px;
      background-color: white;
      border: 2px solid white;
      border-radius: 50%;
    }

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      input {
        height: 30px;
        font-size: 15px;
      }
    }
  }
`;
