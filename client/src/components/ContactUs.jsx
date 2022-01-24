import React from "react";
import logo from "../img/logo.svg";

const ContactUs = () => {
  return (
    <div className="footer flex col">
      <div className="contact-us flex">
        <div className="about-redfloki flex col">
          <div className="flex">
            <img alt="Red Floki" src={logo} />
          </div>
          <div className="flex">
            <p className="sub-text">
              Red Floki is a Deflationary Token That Charges Tx Fees On
              Everything But Buys. The Fees Charged On All Non-Buy Transactions
              Help Reward And Protect All HOLDRs.
            </p>
          </div>
        </div>
        <div className="community flex col">
          <h3 className="h3 red flex">Community</h3>
          <p className="social-link flex">
            <a
              className="flex"
              href="https://twitter.com/Red_Floki"
              target="_blank"
            >
              Twitter
            </a>
          </p>
          <p className="social-link flex">
            <a
              className="flex"
              href="https://www.instagram.com/Red_Floki/"
              target="_blank"
            >
              Intagram
            </a>
          </p>
          <p className="social-link flex">
            <a className="flex" href="https://t.me/Red_Floki" target="_blank">
              Telegram
            </a>
          </p>
        </div>
        <div className="resource flex col">
          <h3 className="h3 red flex">Recources</h3>
          <p className="social-link flex">
            <a
              className="flex"
              href="https://poocoin.app/tokens/0x2a3e1d095f2902c9b6da1bff7813a7b2fc65c3da"
              target="_blank"
            >
              Chart
            </a>
          </p>
          <p className="social-link flex">
            <a
              className="flex"
              href="https://bscscan.com/token/0x2A3E1D095F2902C9B6Da1bFF7813a7B2fc65C3dA"
              target="_blank"
            >
              Contract
            </a>
          </p>
          <p className="social-link flex">
            <a
              className="flex"
              href="https://redfloki.com/Red-Floki-Audit.pdf"
              target="_blank"
            >
              Security Audit
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
