// Library Imports
import React, { Component, Fragment } from "react";
import { OwnAddress } from "shared/pages/_wallet/transfer/receive";
import { Ticker } from "shared/reducers/types";
import Tab from "../../../components/tab";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import { SendFunds } from "./send";
import { AddressEntry } from "shared/reducers/address";
import {StakeNative} from "./stakeNative";
import DarkHeader from "../../../components/_layout/darkHeader";

// Relative Imports

interface TransferOwnProps {
  sendFunds: (
    address: string,
    amount: number,
    ticker: Ticker,
    sweepAll: boolean
  ) => void;
  addresses: AddressEntry[];
  isProcessing: boolean;
}

interface TransferState {
  firstTabState: boolean;
  secondTabState: boolean;
}

type TransferProps = TransferOwnProps;

export class Staking extends Component<TransferProps, TransferState> {
  state: TransferState = {
    firstTabState: true,
    secondTabState: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value,
    });
  };

  toggleSend = () => {
    this.setState({
      firstTabState: true,
      secondTabState: false,
    });
  };

  toggleReceive = () => {
    this.setState({
      firstTabState: false,
      secondTabState: true,
    });
  };

  render() {
    return (
      <Fragment>
        <Body>
          <DarkHeader
            title="Stake"
            description="Earn rewards by staking your XEQ"
          />
          <Tab
            firstTabLabel="Native XEQ"
            secondTabLabel="wXEQ (Coming Soon)"
            firstTabState={this.state.firstTabState}
            secondTabState={this.state.secondTabState}
            firstTabClickEvent={this.toggleSend} // toggleSend
            secondTabClickEvent={this.toggleSend}
            onClick={() => {}}
          />

          {this.state.firstTabState ? (
            <StakeNative
              sendFunds={this.props.sendFunds}
              isProcessing={this.props.isProcessing}
            />
          ) : (
            // <OwnAddress />
              <StakeNative
                  sendFunds={this.props.sendFunds}
                  isProcessing={this.props.isProcessing}
              />
          )}
        </Body>
      </Fragment>
    );
  }
}
