// Library Imports
import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {AssetOption} from "shared/pages/_wallet/exchange";
import {Ticker} from "shared/reducers/types";
import {XBalances} from "shared/reducers/xBalance";
import {convertBalanceToMoney} from "utility/utility";
import Description from "../../../components/_inputs/description";
import Dropdown from "../../../components/_inputs/dropdown";
import Footer from "../../../components/_inputs/footer";
import Form from "../../../components/_inputs/form";
import Input from "../../../components/_inputs/input";
import InputButton from "../../../components/_inputs/input_button";

import {Container} from "./styles";
import TransferSummary from "shared/components/_summaries/transfer-summary";
import StakingSummary from "./stakingSummary";
// Relative Imports

const xhvOption = {name: "Native XEQ", ticker: Ticker.XHV};
const xUSDOption = {name: "Wrapped XEQ", ticker: Ticker.xUSD};

interface TransferOption {
    name: string;
    ticker: Ticker;
}

interface TransferOwnProps {
    sendFunds: (
        address: string,
        amount: number,
        ticker: Ticker,
        sweepAll: boolean
    ) => void;
    isProcessing: boolean;
}

interface TransferReduxProps {
    xBalances: XBalances;
    options: Array<TransferOption>;
}

interface TransferState {
    selectedAsset: AssetOption | null;
    send_amount: string;
    recipient_address: string;
    amountError: string;
    reviewed: boolean;
    sweep_all: boolean;
    pools: Array<ServiceNodes>;
    selected_pool: string;
    prev_amount: number;
}

interface Contributors {
    address: string,
    amount: number,
    reserved: number
}

interface ServiceNodes {
    contributors: Array<Contributors>,
    last_reward_block_height: number,
    last_reward_transaction_index: number,
    last_uptime_proof: number,
    operator_address: string,
    portions_for_operator: number,
    registration_height: number,
    service_node_pubkey: string,
    staking_requirement: number,
    total_contributed: number,
    total_reserved: number
}

type TransferProps = TransferOwnProps & TransferReduxProps;

class TransferContainer extends Component<TransferProps, TransferState> {
    state: TransferState = {
        selectedAsset: this.props.options[0],
        send_amount: "",
        recipient_address: "",
        amountError: "",
        reviewed: false,
        sweep_all: false,
        pools: [],
        selected_pool: "",
        prev_amount: 0
    };

    componentDidMount() {
        window.scrollTo(0, 0);

        this.setState({
            selectedAsset: this.props.options[0],
        });

        fetch("https://api.ili.bet/api/v1/service_nodes", {
            headers: {"Content-Type": "application/json"},
            method: "GET"
        })
            .then(res => res.json()).then((result) => {
            this.setState({
                pools: result[0],
            });
            this.findPool()

        }).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    handleReviewSubmit = (event: any) => {
        const {checked} = event.target;
        this.setState({reviewed: checked});
    };

    handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState<never>({
            [name]: value,
        });
    };

    handleSendAmountChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState<never>({
            [name]: value,
            sweep_all: false,
        });
    };

    setSendAsset = (asset: AssetOption) => {
        this.setState({
            selectedAsset: asset,
            sweep_all: false,
        });
    };

    handleSubmit = () => {
        const {send_amount, recipient_address, selectedAsset} = this.state;

        if (selectedAsset !== null) {
            this.props.sendFunds(
                recipient_address,
                Number(send_amount),
                selectedAsset.ticker,
                this.state.sweep_all
            );
        }
    };

    // setMaxAmount = () => {
    //   const { selectedAsset } = this.state;
    //
    //   let availableBalance = null;
    //   if (selectedAsset) {
    //     availableBalance = convertBalanceToMoney(
    //       this.props.xBalances[selectedAsset.ticker].unlockedBalance
    //     );
    //   }
    //
    //   if (availableBalance != null) {
    //     this.setState({
    //       send_amount: availableBalance.toFixed(2),
    //       sweep_all: true,
    //     });
    //   } else {
    //     this.setState({
    //       amountError: "Select an asset",
    //     });
    //   }
    // };

    amountIsValid = (availableBalance: number): string | true => {
        const {send_amount} = this.state;

        const convertToNum = parseFloat(send_amount);

        //@ts-ignore
        if (convertToNum > availableBalance) {
            return "Not enough funds";
        }

        return true;
    };

    // @ts-ignore
    recipientIsValid = () => {
        const recipient = this.state.recipient_address;
        if (recipient.length > 97) {
            return "";
        } else if (recipient === "") {
            return "";
        } else {
            return "Enter a valid address";
        }
    };

    findPool() {
        let addys: string[] = []
        for (let i = 0; i < this.state.pools.length; i++) {
            let current_amount = 0
            let operator_address = ""
            for (let j = 0; j < this.state.pools[i].contributors.length; j++) {
                addys.push(this.state.pools[i].contributors[j].address)
            }
            if ((this.state.pools[i].staking_requirement - this.state.pools[0].total_contributed) / 10000 >= Number(this.state.send_amount) && ((this.state.pools[0].portions_for_operator / 18446744073709551612) * 100) > current_amount) {
                current_amount = (this.state.pools[0].portions_for_operator / 18446744073709551612) * 100
                operator_address = this.state.pools[0].service_node_pubkey
            }
            this.setState({selected_pool: this.state.pools[0].service_node_pubkey})
        }
        let filteredAddys = addys.filter((c, index) => {
            return addys.indexOf(c) === index;
        });
        console.log("Number of unique node operators: " + filteredAddys.length.toString())
    }

    render() {
        const {selectedAsset, send_amount, selected_pool} = this.state;

        const windowWidth = window.innerWidth;

        if (Number(this.state.send_amount) > this.state.prev_amount) {
            this.findPool()
            this.state.prev_amount = Number(this.state.send_amount)
        }

        let availableBalance = 0;
        if (selectedAsset) {
            availableBalance = convertBalanceToMoney(
                this.props.xBalances[selectedAsset.ticker].unlockedBalance
            );
        }

        const checkValidation =
            send_amount.length > 0 &&
            selected_pool.length > 97 &&
            this.amountIsValid(availableBalance) === true;

        // @ts-ignore
        return (
            <Fragment>
                {/*<Form onSubmit={this.handleSubmit}>*/}
                <Input
                    // @ts-ignore
                    label={
                        availableBalance
                            ? `Amount (Avail. ${availableBalance.toLocaleString()})`
                            : "Amount"
                    }
                    placeholder="Enter amount"
                    type="number"
                    style={{"width": "100%"}}
                    // @ts-ignore
                    error={this.amountIsValid(availableBalance.toLocaleString())}
                    name="send_amount"
                    value={send_amount}
                    onChange={this.handleSendAmountChange}
                />
                <StakingSummary
                    recipientAddress={
                        selected_pool === "" ? "--" : selected_pool
                    }
                    transferAsset={selectedAsset === null ? "--" : selectedAsset.ticker}
                    transferAmount={send_amount === "" ? "--" : send_amount}
                    onChange={this.handleReviewSubmit}
                />
                {/*</Form>*/}
                <Container>
                    <Footer
                        onClick={() => this.handleSubmit()}
                        loading={this.props.isProcessing}
                        label={"Preview"}
                        disabled={!checkValidation}
                    />
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = (
    state: any,
    ownProps: TransferOwnProps
): TransferReduxProps => ({
    xBalances: state.xBalance,
    options: [xhvOption, xUSDOption],
});

export const StakeNative = connect<TransferReduxProps, {}, TransferOwnProps>(
    mapStateToProps,
    {}
)(TransferContainer);
