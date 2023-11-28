import { Link } from "react-router-dom"
import Logo from './Logo';


export default function Landing() {
    return (
        <>
        <div className="landingContainer">
            <h1 className="welcomeHeading">Welcome to Osteoporosis Tracker</h1>
            <Logo />
            <br></br>
            <Link className="welcomeButton" to="/login">Login</Link>
            <Link className="welcomeButton" to="/signup">Sign Up</Link>
        </div>
        </>
    );
  }