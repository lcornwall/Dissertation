import logo from "../assets/logo.svg";

export default function Sun() {
    return (
        <>
        <div className="landingContainer">
            <h1 className="welcomeHeading">Sun Exposure Tracking</h1>
            <img src={logo} alt="logo" width="400" height="200" />
            <br></br>
        </div>
        </>
    );
  }