// Library Imports
import React, {Component} from "react";

// Relative Imports
import {Container, Overview, Item, Wrapper, ItemDisabled} from "./styles";

import {MultiBalance} from "../../multi-balance";

class Menu extends Component {
    render() {
        return (
            <Container>
                <Overview>
                    <MultiBalance/>
                </Overview>
                <Wrapper>
                    <Item to="/wallet/assets">Wallet</Item>
                </Wrapper>
                <Wrapper>
                    <Item to="/wallet/transfer">Transfer</Item>
                </Wrapper>
                <Wrapper>
                    <Item to="/wallet/staking">Staking Pools</Item>
                </Wrapper>
                <Wrapper>
                    <ItemDisabled >Swap (Coming Soon)</ItemDisabled>
                </Wrapper>
                <Wrapper>
                    <ItemDisabled>Pythia (Coming Soon)</ItemDisabled>
                </Wrapper>
                <Wrapper>
                    <ItemDisabled>Block Explorer (Coming Soon)</ItemDisabled>
                </Wrapper>
                <Wrapper>
                    <ItemDisabled>Oracle Explorer (Coming Soon)</ItemDisabled>
                </Wrapper>
                <Wrapper>
                    <ItemDisabled>Network Info (Coming Soon)</ItemDisabled>
                </Wrapper>
                <Wrapper>
                    <Item to="/wallet/settings">Settings</Item>
                </Wrapper>
            </Container>
        );
    }
}

export default Menu;
