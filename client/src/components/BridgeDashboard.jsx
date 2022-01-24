import React, { useEffect, useState } from "react";
import Button from "./ThemeButton";
import { web3, account } from "./WalletConnect";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import abi_config from "./contract/config.json";
import EthTokenAbi from "./contract/EthToken.json";
import BscTokenAbi from "./contract/BscToken.json";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";

import { ethToBscRequest, bscToEthRequest } from "./actions/convert";
import { set } from "express/lib/application";

const EthTokenAddress = abi_config.eth_token;
const BscTokenAddress = abi_config.bsc_token;

const BridgeDashboard = () => {
  const connectState = localStorage.getItem("isWalletConnected");
  const storedAccount = localStorage.getItem("currentAccount");
  const [account, setAccount] = useState(storedAccount);
  const [ethBalance, setEthBalance] = useState(0);
  const [bscBalance, setBscBalance] = useState(0);
  const [value, setValue] = useState(0);
  const [processing, setProcessing] = useState(false);
  web3.eth.setProvider(web3.givenProvider);
  const ethContract = new web3.eth.Contract(EthTokenAbi, EthTokenAddress);
  const bscContract = new web3.eth.Contract(BscTokenAbi, BscTokenAddress);

  const ethBridgeAddress = abi_config.eth_bridge;
  const bscBridgeAddress = abi_config.bsc_bridge;

  const [currentNetworks, setCurrentNetworks] = useState({});

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });

  const updateCurrentNetworks = () => {
    try {
      setCurrentNetworks({
        isEth: window.ethereum.networkVersion == 1 || window.ethereum.networkVersion == 4,
        isBsc: window.ethereum.networkVersion == 56 || window.ethereum.networkVersion == 97
      });
    } catch(e) {
      toast.warning("Please install Metamask2.", {
        transition: bounce,
      });
    }
  }

  const isConditionOk = (net_flag) => {
    if (
      !localStorage.getItem("isWalletConnected") ||
      !localStorage.getItem("currentAccount")
    ) {
      toast.warning("Please connect your wallet!", {
        transition: bounce,
      });
      return false;
    }

    if(window.ethereum.selectedAddress == null) {
      toast.warning("Unlock your wallet and connect to it.", {
        transition: bounce,
      });
      return false;
    }

    if(net_flag == 1 && !currentNetworks.isEth){
      toast.warning("Switch network to Ethereum.", {
        transition: bounce,
      });
      return false;
    }
    if(net_flag == 2 && !currentNetworks.isBsc) {
      toast.warning("Switch network to Binance.", {
        transition: bounce,
      });
      return false;
    }

    if (value <= 0 || !value) {
      toast.error("Please input valid number!", {
        transition: bounce,
      });
      return false;
    }

    return true;
  }

  const EthToBsc = async () => {
    if(!isConditionOk(1)) return false;
    //Sign message...
    const account = localStorage.getItem("currentAccount");

    await ethContract.methods.transfer(ethBridgeAddress, ethers.BigNumber.from(String(value * (10 ** 18)))).send({from: account}).on('receipt', async () => {
        await web3.eth.personal
        .sign(web3.utils.sha3(`Sign with amount: ${value}`), account)
          .then(async (e) => {
            console.log(`${value} ETHFloki sent to convert`);
            setProcessing(true);
            await ethToBscRequest(
              account,
              value,
              e,
              web3.utils.sha3(`Sign with amount: ${value}`)
            );
            setProcessing(false);
          });
      }); 
    }
  const BscToEth = async () => {
    if(!isConditionOk(2)) return false;
    //Sign message...
    const account = localStorage.getItem("currentAccount");

    await bscContract.methods.transfer(bscBridgeAddress, ethers.BigNumber.from(String(value * (10 ** 18)))).send({from: account}).on('receipt', async () => {
      await web3.eth.personal
      .sign(web3.utils.sha3(`Sign with amount: ${value}`), account)
        .then(async (e) => {
          console.log(`${value} BSCFloki sent to convert`);
          setProcessing(true);
          await bscToEthRequest(
            account,
            value,
            e,
            web3.utils.sha3(`Sign with amount: ${value}`)
          );
          setProcessing(false);
      });
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if(!window.ethereum) {
      toast.warning("Click here to install Metamask.", {
        transition: bounce,
        onClick: () => window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en", "_blink", "width=700, height=600, location=no, toolbar=no, menubar=no")
      });
      return;
    }

    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
      localStorage.setItem("currentAccount", accounts[0]);
      toast.warning("You changed your account.", {
        transition: bounce,
      });
      updateCurrentNetworks();
    });

    window.ethereum.on("networkChanged", (networkId) => {
      console.log(networkId);
      localStorage.setItem("currentNetwork", networkId);
      toast.warning("You changed network.", {
        transition: bounce,
      });
      updateCurrentNetworks();
    });

    updateCurrentNetworks();
  }, []);
  return (
    <div className="bridge-dashboard">
      <div className="dashboard flex col">
        <h2 className="flex">Input the value you wish to convert.</h2>
        <div className="input-area flex">
          <input
            type="number"
            min={1}
            className="theme-input"
            placeholder="Input value here..."
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="separator flex col">
        <div className="hr"> </div>
      </div>
      <div className="eth-to-bnb flex col">
        <h2 className="flex">Move your Red Floki from Ethereum to Binance</h2>
        <h4 className="flex">Ethereum RedFloki: {EthTokenAddress}</h4>
        <div className="button-area flex">
          <Button
            name="Click here and convert ETH to BSC"
            loading={processing}
            onClick={EthToBsc}
          />
        </div>
      </div>
      <div className="separator flex col">
        <div className="hr"> </div>
      </div>
      <div className="bnb-to-eth flex col">
        <h2 className="flex">Move your Red Floki from Binance to Ethereum</h2>
        <h4 className="flex">Binance RedFloki: {BscTokenAddress}</h4>
        <div className="button-area flex">
          <Button
            name="Click here and convert BSC to ETH"
            loading={processing}
            onClick={BscToEth}
          />
        </div>
      </div>
    </div>
  );
};

export default BridgeDashboard;
