import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "../../../assets/styles/media.js";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 3;
`;

export const Container = styled(Link)`
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.body.border};
  padding: 20px;
  border-radius: 4px;
  text-decoration: none;
  flex-direction: column;
  transition: 500ms;
  grid-column: ${(props) => (props.fullwidth ? "1 / 3" : null)}
  display: flex;
  justify-content: space-between;


  ${media.laptop`
    grid-column: 1 / 3;
  `}

  ${media.mobile`
    grid-column: 1 / 3;
  `}

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.body.foreground};
    border: 1px solid ${(props) => props.theme.body.border};
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    transition: 500ms;
`;

export const Inner = styled.div`
  height: 100%;
  width: 16px;
  display: flex;
  align-items: center;
  margin-left: 16px;
  background: red;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled.img`
  height: 16px;
  width: 16px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Space = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-family: Inter-Bold;
  font-size: 17px;
  color: ${(props) => props.theme.type.primary};
  letter-spacing: 0;
  line-height: 30px;
  text-align: ${(props) => (props.left ? "left" : "right")};
`;

export const Ticker = styled.div`
  font-family: Inter-Regular;
  margin-left: 8px;
  font-size: 17px;
  color: ${(props) => props.theme.type.secondary};
  letter-spacing: 0;
  line-height: 30px;
  text-align: ${(props) => (props.left ? "left" : "right")};
`;

export const Subtitle = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.type.secondary};
  letter-spacing: 0;
  line-height: 24px;
  text-align: ${(props) => (props.left ? "left" : "right")};
`;

export const Pending = styled.div`
  background: ${(props) => props.theme.body.foreground};
  height: auto;
  grid-column: 1 / 3;
`;

export const Status = styled.div`
  font-family: Inter-Regular;
  font-size: 12px;
  color: ${(props) => props.theme.type.secondary};
  letter-spacing: 0;
  line-height: 24px;
  text-align: ${(props) => (props.left ? "left" : "right")};
`;
