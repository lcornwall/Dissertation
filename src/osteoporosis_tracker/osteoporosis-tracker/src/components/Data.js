import logo from "../assets/logo.svg";

export default function Data() {
    return (
        <>
        <div className="landingContainer">
            <h1 className="welcomeHeading">Welcome to Your Data</h1>
            <img src={logo} alt="logo" width="400" height="200" />
            <br></br>
        </div>
        </>
    );
  }