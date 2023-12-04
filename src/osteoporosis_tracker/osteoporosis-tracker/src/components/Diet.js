import logo from "../assets/logo.svg";
import React from "react";


export default function Diet() {
    return (
        <>
        <div className="landingContainer">
            <h1 className="welcomeHeading">Diet Tracking</h1>
            <img src={logo} alt="logo" width="400" height="200" />
            <br></br>
        </div>
        </>
    );
  }