import styled from "styled-components";
import color from "../../utils/styles/colors";

export const Div = styled.div`
  min-height: 100vh;
  background: ${color.secondary};
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 90%;
    max-width: 1024px;
    margin-top: 10%;
  }

  span {
    width: 90%;
    margin-top: 20px;
    font-size: 20px;
    text-align: center;
  }
`;
