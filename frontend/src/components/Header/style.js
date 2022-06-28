import styled from "styled-components";
import color from "../../utils/styles/colors";

export const Nav = styled.nav`
  background-color: ${color.tertiary};

  @media (max-width: 768px) {
    padding: 5px 0;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1440px;
  margin: auto;

  @media (max-width: 768px) {
    width: 95%;
  }
`;
export const LogoImg = styled.img`
  display: flex;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    width: 95%;
  }
`;
export const Div = styled.div`
  display: flex;
`;
export const AvatarImg = styled.img`
  max-width: 60px;
  max-height: 60px;
  margin-right: 5px;
  background-color: white;
  border: 2px solid white;
  border-radius: 50%;
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
  margin-left: 5px;
  color: white;
  font-weight: 600;

  @media (max-width: 768px) {
    display: none;
  }
`;
