import React, { setState, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import WalletConnectProvider from "@walletconnect/web3-provider";

var web3Modal;
var provider;
var providerOptions;
var defaultAccount;

const getweb3 = async () => {
    providerOptions = {
        metamask: {
            id: "injected",
            name: "MetaMask",
            type: "injected",
            check: "isMetaMask",
        },
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "INFURA_ID",
                network: "mainnet",
                qrcodeModalOptions: {
                    mobileLinks: [
                        "rainbow",
                        "metamask",
                        "argent",
                        "trust",
                        "imtoken",
                        "pillar",
                    ],
                },
            },
        },
    };

    web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: false,
        providerOptions,
    });

    provider = await web3Modal.connect();

    localStorage.setItem('isWalletConnected', true);

    new Web3(provider).eth.getAccounts().then((res) => {
        defaultAccount = res[0];
        console.log("Got Account" + res[0]);
        localStorage.setItem('currentAccount', res[0]);
    })

    provider.on("error", (e) => console.error("WS ERROR", e));
    provider.on("end", (e) => console.error("WE END", e));

    provider.on("disconnect", (e) => console.log(e));
    provider.on("connect", (e) => console.log(e));
};

export const close = async () => {
    provider = null;
    localStorage.clear();
}

export var web3 = new Web3(provider);

export var account = defaultAccount;

export default getweb3;