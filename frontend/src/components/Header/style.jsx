import styled from "styled-components";
import color from "../../utils/styles/colors";

export const Nav = styled.nav`
  background-color: ${color.tertiary};
`;
export const LogoImg = styled.img`
  display: flex;
  max-width: 400px;
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1440px;
  margin: auto;
`;
export const ContainerLink = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Button = styled.button`
  cursor: pointer;
  font-size: 15px;
  color: ${color.primary};
  background-color: ${color.tertiary};
  border: none;
  &:hover {
    text-decoration: underline white;
  }
`;
export const Span = styled.span`
  margin-left: 10px;
  color: white;
  font-weight: 600;
`;
export const Img = styled.img`
  max-width: 60px;
  max-height: 60px;
  margin-right: 5px;
  background-color: white;
  border: 2px solid white;
  border-radius: 50%;
`;