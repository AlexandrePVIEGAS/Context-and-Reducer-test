import styled from "styled-components";
import color from "../../utils/styles/colors";

export const SuccessOrError = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 5px;
  font-size: 20px;
  color: white;
  ${({ success }) => success && `background-color: ${color.succesColor} ;`};
  ${({ error }) => error && `background-color: ${color.primary} ;`};
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
`;
export const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 300px;
`;
export const Input = styled.input`
  height: 30px;
  font-size: 15px;
`;
