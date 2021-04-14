// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Overview from "../../../components/_layout/overview";
import Cell from "../../../components/cell";
import CellDisabled from "../../../components/cell_disabled";

import { AssetList } from "constants/assets";
import { convertBalanceToMoney } from "utility/utility";
import { Ticker } from "shared/reducers/types";
import { DesktopAppState } from "platforms/desktop/reducers";
import {
  selectValueOfAssetsInUSD,
  XBalances,
  XViewBalance,
} from "shared/reducers/xBalance";
import { WebAppState } from "platforms/web/reducers";
import {
  BlockHeaderRate,
  selectXRate,
} from "shared/reducers/blockHeaderExchangeRates";
import DarkHeader from "../../../components/_layout/darkHeader";

interface AssetsProps {
  balances: XBalances;
  rates: BlockHeaderRate[];
  assetsInUSD: XViewBalance;
}

interface AssetsState {}

const Enabled_TICKER = [Ticker.xUSD, Ticker.XEQ];

class AssetsPage extends Component<AssetsProps, any> {
  state = {
    forexPriceFetched: false,
    price: 1
  };

  componentDidMount() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=triton&vs_currencies=usd')
        .then(function(response) {
          if (response.status >= 400) {
          }
          return response.json();
        })
        .then((price) => {
          this.state.price = price.triton.usd
        });
    window.scrollTo(0, 0);
  }

  renderEnabledTokens = () => {
    const enabledTokens = AssetList.filter((asset: any) =>
      Enabled_TICKER.includes(("x" + asset.ticker) as Ticker)
    );
    return enabledTokens.map((data) => {
      const { token, ticker } = data;

      const xTicker = ("x" + ticker) as Ticker;

      const unlockedBalance = convertBalanceToMoney(
        this.props.balances[xTicker].unlockedBalance
      );

      const totalBalance = convertBalanceToMoney(this.props.balances[xTicker].balance);

      const lockedBalance = convertBalanceToMoney(
        this.props.balances[xTicker].lockedBalance
      );

      console.log("TEST", this.state.price)

      const value = this.props.assetsInUSD[xTicker]!.unlockedBalance;
      const xRate = 1;

      return (
        <Cell
          fullwidth="fullwidth"
          key={token}
          tokenName={token}
          ticker={xTicker}
          price={1}
          value={value}
          totalBalance={totalBalance}
          lockedBalance={lockedBalance}
          unlockedBalance={unlockedBalance}
        />
      );
    });
  };

  renderDisabledTokens = () => {
    const disabledTokens = AssetList.filter(
      (asset: any) => !Enabled_TICKER.includes(("x" + asset.ticker) as Ticker)
    );

    return disabledTokens.map((data) => {
      const { token, ticker, symbol } = data;

      const xTicker = (ticker) as Ticker;
      const rates = this.props.rates;
      const xRate = selectXRate(rates, xTicker, Ticker.xUSD);
      const xRateString = symbol + xRate.toFixed(2);

      return (
        <CellDisabled
          fullwidth="fullwidth"
          key={token}
          tokenName={token}
          ticker={ticker}
          price={xRateString}
          balance={"0.00"}
        />
      );
    });
  };

  render() {
    const unlockedBalance = convertBalanceToMoney(
      this.props.balances.XHV.unlockedBalance
    );

    const totalBalance = convertBalanceToMoney(this.props.balances.XHV.balance);

    const lockedBalance = convertBalanceToMoney(this.props.balances.XHV.lockedBalance);

    const xhvInUSD = this.props.assetsInUSD.XHV!.unlockedBalance;
    const xRate = selectXRate(this.props.rates, Ticker.XEQ, Ticker.xUSD);

    return (
      <Body>
        <Overview />
        <DarkHeader
          title="Available Tokens"
          description="Overview of all Equilibria tokens."
        />
        <Cell
          //@ts-ignore
          key={1}
          tokenName={"Native Equilibria"}
          ticker={"XEQ"}
          price={this.state.price}
          value={xhvInUSD}
          fullwidth="fullwidth"
          totalBalance={totalBalance.toFixed(2)}
          lockedBalance={lockedBalance}
          unlockedBalance={unlockedBalance}
        />
        {this.renderEnabledTokens()}
        <DarkHeader
          title="Disabled Equilibria Tokens"
          description="These are tokens that have not been added to the web app or have not been deployed."
        />
        {this.renderDisabledTokens()}
        {/*<Header*/}
        {/*    title="Pythia Contracts (Testnet)"*/}
        {/*    description="Data feeds managed by Equilibria's oracle network. (testnet)"*/}
        {/*/>*/}
      </Body>
    );
  }
}

export const mapStateToProps = (state: DesktopAppState | WebAppState) => ({
  assetsInUSD: selectValueOfAssetsInUSD(state),
  rates: state.blockHeaderExchangeRate,
  balances: state.xBalance,
});

export const Assets = connect(mapStateToProps, {})(AssetsPage);
