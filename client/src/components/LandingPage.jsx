import React from "react";
import Button from "./ThemeButton";
import "../styles/button.css";
import floki from "../img/redfloki.svg";
import telegram from "../img/Telegram.svg";
import twitter from "../img/Twitter.svg";
import instagram from "../img/Instagram.svg";
import BridgeDashboard from "./BridgeDashboard";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const LandingPage = () => {
  const locate = (url) => {
    window.location.assign(url);
  };

  return (
    <>
      {/* <Particle params={particlesConfig} className="App-particles__container" /> */}
      <div className="landing-page flex col">
        <div className="main-stack-color bridge-header flex row">
          <div className="bridge-workspace flex col">
            <div className="title-banner flex col">
              <h1 className="h1 flex">Ethereum - Binance Smart Chain Bridge</h1>
            </div>
            <div className="description flex">
              <p className="text flex">
                Red Floki is a Deflationary Token That Charges Tx Fees On
                Everything But Buys. The Fees Charged On All Non-Buy
                Transactions Help Reward And Protect All HOLDRs.
              </p>
            </div>
            <div className="button-area flex">
              <Button
                name="Check Bscscan"
                onClick={() =>
                  locate(
                    "https://bscscan.com/token/0x2A3E1D095F2902C9B6Da1bFF7813a7B2fc65C3dA"
                  )
                }
              />
              <Button
                name="Chart"
                onClick={() =>
                  locate(
                    "https://poocoin.app/tokens/0x2a3e1d095f2902c9b6da1bff7813a7b2fc65c3da"
                  )
                }
              />
            </div>
            <div className="social-area flex">
              <div className="telegram flex">
                <a href="https://t.me/Red_Floki" target="_blank">
                  <img alt="Telegram" src={telegram} />
                </a>
              </div>
              <div className="twitter flex">
                <a href="https://twitter.com/Red_Floki" target="_blank">
                  <img alt="Twitter" src={twitter} />
                </a>
              </div>
              <div className="instagram flex">
                <a href="https://t.me/Red_Floki" target="_blank">
                  <img alt="Instagram" src={instagram} />
                </a>
              </div>
            </div>
          </div>
          <div className="floki-wallpaper flex">
            <img
              alt="Red Floki"
              className="redfloki-main-character"
              src={floki}
            />
          </div>
        </div>
        {/* <div className="adfloki flex">
          <img className="adfloki-character" src={adfloki} />
        </div> */}
      </div>
      <div className="dashboard-section flex">
        <div className="landing-page flex">
          <BridgeDashboard />
        </div>
      </div>
      <ContactUs />
      <Footer />
    </>
  );
};

export default LandingPage;
