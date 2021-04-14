// Library Imports
import React from "react";

// Relative Imports
import { Container, Row, Key, Value } from "../../../components/_summaries/transfer-summary/styles";
// import Confirm from "../../confirm/index.js";

const StakingSummary = ({
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
                <Key>Amount to Stake</Key>
                <Value>
                    {transferAmount === "--"
                        ? "0"
                        : transferAmount && !isNaN(transferAmount)
                            ? parseFloat(transferAmount).toLocaleString()
                            : "0"}{" "}
                    XEQ
                </Value>
            </Row>
            <Row>
                <Key>Pool Operator</Key>
                <Value>{recipientAddress === "--" ? "--" : truncated}</Value>
            </Row>
        </Container>
    );
};

export default StakingSummary;
