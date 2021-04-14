// Library Imports
import React from "react";

// Relative Imports
import { Container, Back, Row } from "./styles";
import {Title, Description, SecondaryTitle} from "../../../../assets/styles/type.js";

const DarkHeader = ({ title, description, back = false }) => {
  return (
    <Container>
      <Row>
        {back && <Back to="/wallet/assets">« Back</Back>}
        <SecondaryTitle>{title}</SecondaryTitle>
      </Row>
      <Description>{description}</Description>
    </Container>
  );
};

export default DarkHeader;
