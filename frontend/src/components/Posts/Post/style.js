import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  img {
    max-width: 50px;
    max-height: 50px;
    border-radius: 50%;
  }
`;
export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
`;
export const UserName = styled.span`
  margin-bottom: 5px;
  font-weight: bold;
`;
