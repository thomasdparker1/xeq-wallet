import styled from "styled-components";

export const Body = styled.div`
  min-height: 264px;
  margin: 10px;
`;

export const Wrapper = styled.div`
  height: auto;
  margin-bottom: 10px;
`;

export const Url = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.type.primary};
`;
