// Library Imports
import React from "react";

// Relative Imports
import { Container, Row, Key, Value } from "./styles";
// import Confirm from "../../confirm/index.js";

const TransferSummary = ({
  transferAsset,
  transferAmount,
  recipientAddress,
  onChange,
}) => {
  const first = recipientAddress.substring(0, 4);
  const last = recipientAddress.substring(recipientAddress.length - 4);
  const truncated = first + "...." + last;

  return (
    <Container>
      <Row>
        <Key>Transfer Amount</Key>
        <Value>
          {transferAmount === "--"
            ? "0"
            : transferAmount && !isNaN(transferAmount)
            ? parseFloat(transferAmount).toLocaleString()
            : "0"}{" "}
          {transferAsset}
        </Value>
      </Row>
      <Row>
        <Key>Recipient Address</Key>
        <Value>{recipientAddress === "--" ? "--" : truncated}</Value>
      </Row>
    </Container>
  );
};

export default TransferSummary;
