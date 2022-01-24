import React, { useState, useEffect } from "react";
import Button from "./ThemeButton";
import logo from "../img/logo.svg";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import { close } from "./WalletConnect";
import getweb3 from "./WalletConnect";

import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [web3, setWeb3] = useState(null);
  const isWalletConnected = localStorage.getItem("isWalletConnected");
  const currentAccount = localStorage.getItem("currentAccount");
  const [connectState, setConnecState] = useState(
    isWalletConnected && currentAccount
  );

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });

  const connect = async () => {
    if (!connectState && (!currentAccount || currentAccount == undefined)) {
      setWeb3(getweb3);
      setConnecState(true);
    } else {
      close();
      setConnecState(false);
    }
  };

  useEffect(() => {
    try{
      if(window.ethereum.selectedAddress == null) {
        toast.warning("Unlock your wallet and connect to it.", {
          transition: bounce,
        });
        close();
        setConnecState(false);
      }
    }catch (e) {
      toast.warning("Click here to install Metamask.", {
        transition: bounce,
        onClick: () => window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en", "_blink", "width=700, height=600, location=no, toolbar=no, menubar=no")
      });
    }
  }, [])

  return (
    <div className="header flex">
      <div className="header-content flex">
        <div className="logo-container flex">
          <img alt="Red Floki" className="logo flex" src={logo} />
        </div>
        <div className="button-area flex">
          <Button
            name={connectState ? "Disconnect" : "Connect Wallet"}
            onClick={connect}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
