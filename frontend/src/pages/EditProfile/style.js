import styled from "styled-components";
import color from "../../utils/styles/colors";

export const Container = styled.div`
  height: 100vh;
  background-color: ${color.secondary};
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  font-size: 20px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;
export const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin-bottom: 30px;
  background-color: white;
  border: 2px solid white;
  border-radius: 50%;
`;
export const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const Input = styled.input`
  height: 30px;
  font-size: 15px;
`;
