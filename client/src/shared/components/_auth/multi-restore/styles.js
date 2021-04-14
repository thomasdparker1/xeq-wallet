import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: auto;
  width: 624px;
  flex-direction: column;
  margin: 20px;
  border: 1px solid #3a4048;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
`;

export const Main = styled.div`
  background: #84b2e6;
  border-radius: 2px 2px 0px 0px;
  height: auto;
  padding: 10px;
`;

export const Header = styled.div`
  height: auto;
  width: auto;
  padding: 20px;
  background: #84b2e6;
  border-bottom: 1px solid #3a4048;
`;

export const Tabs = styled.div`
  height: 40px;
  wdith: 100%;
  background: red;
  display: flex;
`;

export const Tab = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: ${(props) => (props.active ? "#36393F" : "#2B2E32")};
  color: ${(props) => (props.active ? "#ffffff" : "#172b4d")};

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  font-family: Inter-SemiBold;
  font-size: 20px;
  color: #fff;
  letter-spacing: 0;
  line-height: 30px;
`;

export const Description = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #172b4d;
  line-height: 24px;
`;

export const Progress = styled.div`
  display: grid;
  background: #2b2e34;
  height: 4px;
  width: 100%;
  margin-bottom: 16px;
`;

export const Step = styled.div`
  width: ${(props) =>
    (props.width === 1 ? "10%" : null) ||
    (props.width === 2 ? "50%" : null) ||
    (props.width === 3 ? "100%" : null)}
  background: #005BC6;
  height: auto;
  border-radius: 4px;
`;

export const Body = styled.div`
  min-height: 266px;
  height: auto;
  width: auto;
  margin: 10px;
`;

export const Buttons = styled.div`
  height: auto;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Submit = styled.button`
  background: #005BC6;
  border-radius: 4px;
  font-family: Inter-Regular;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  width: 106px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 500ms;
  border: none;
  outline: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")}

  &:hover {
    cursor: pointer;
    transition: 500ms;
    background: #2363ad;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
`;

export const Back = styled.div`
  background: #172b4d;
  border-radius: 4px;
  font-family: Inter-Regular;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  width: 106px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #3a4048;
  text-decoration: none;
  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: #152441;
    transition: 500ms;
  }
`;

export const Cancel = styled(Link)`
  background: #172b4d;
  border-radius: 4px;
  font-family: Inter-Regular;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  width: 106px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #3a4048;
  text-decoration: none;
  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: #152441;
    transition: 500ms;
  }
`;

export const Footer = styled.div`
  height: 60px;
  border-top: 1px solid #3a4048;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #84b2e6;
  border-radius: 0px 0px 4px 4px;
`;

export const Route = styled(Link)`
  font-family: Inter-SemiBold;
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  margin-left: 8px;
`;

export const Label = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #172b4d;
  text-decoration: none;
`;
