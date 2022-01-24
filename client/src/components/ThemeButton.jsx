import React from "react";
import "../styles/button.css";

const Button = (props) => {
  return (
    <div className="flex">
      {!props.loading ? (
        <button className="btn" onClick={props.onClick}>
          {props.name}
        </button>
      ) : (
        <button className="btn btn-disabled" disabled>
          <div className="_loader">
            <span className="let1">c</span>
            <span className="let2">o</span>
            <span className="let3">n</span>
            <span className="let4">v</span>
            <span className="let5">e</span>
            <span className="let6">r</span>
            <span className="let7">t</span>
            <span className="let8">i</span>
            <span className="let9">n</span>
            <span className="let10">g</span>
            <span className="let11">.</span>
            <span className="let12">.</span>
            <span className="let13">.</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default Button;
