import styled from "styled-components";
import color from "../../utils/style/colors";

export const LogoImg = styled.img`
  display: block;
  width: 100%;
  max-width: 500px;
  margin: auto;
  position: relative;
  right: 15px;
`;
export const SuccessOrError = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 10px;
  font-size: 20px;
  color: white;
  ${(props) => props.success && `background-color: ${color.succesColor} ;`};
  ${(props) => props.error && `background-color: ${color.primary} ;`};
`;
export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
`;
export const SignUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 300px;
`;
export const SignUpInput = styled.input`
  height: 30px;
  font-size: 15px;
`;
export const ErrorMsg = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  background-color: red;
`;
export const SignUpButton = styled.button`
  cursor: pointer;
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 20px;
  color: white;
  background-color: ${color.primary};
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
export const RedirectToLogin = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px;
  font-size: 20px;
  color: white;
  background-color: ${color.tertiary};
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;