import { Link } from "react-router-dom"


export default function Landing() {
    return (
        <>
        <h1 className="welcomeHeading"> Welcome to Osteoporosis Tracker </h1>
        <Link className="welcomeButton" to="/login">Login</Link>
        <Link className="welcomeButton" to="/signup">Sign Up</Link>
        </>
    );
  }