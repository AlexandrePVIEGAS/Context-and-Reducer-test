import styled from "styled-components";
import color from "../../../utils/styles/colors";

export const FormComment = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding-top: 20px;
  border-top: 1px solid ${color.tertiary};

  input {
    width: 100%;
    margin-left: 20px;
    font-size: 16px;
    border: none;
    outline: none;
  }
`;
export const Container = styled.div`
  width: 90%;
  max-width: 1024px;
  margin: 0 auto
  padding: 10px;
  border: none; 
  border-top: 1px solid ${color.tertiary}; 
`;
export const Avatar = styled.img`
  max-width: 40px;
  max-height: 40px
  border-radius: 50%;
`;
