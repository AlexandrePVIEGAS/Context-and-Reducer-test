import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 90%;
    max-width: 768px;
    margin-top: 1%;
  }

  span {
    width: 90%;
    margin: 200px;
    color: red;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }
`;
