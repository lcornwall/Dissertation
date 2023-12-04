import { Link } from "react-router-dom"
import logo from "../assets/logo.svg";

export default function Landing() {
    return (
        <>
        <div className="landingContainer">
            <h1 className="welcomeHeading">Welcome to Osteoporosis Tracker</h1>
            <br></br>
            <img src={logo} alt="logo" width="400" height="200" />
            <br></br>
            <Link className="welcomeButton" to="/login">Login</Link>
            <Link className="welcomeButton" to="/signup">Sign Up</Link>
        </div>
        </>
    );
  }