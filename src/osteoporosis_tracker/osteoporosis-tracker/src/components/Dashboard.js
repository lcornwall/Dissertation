import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.svg";


import diet from "../assets/diet.svg";
import sun from "../assets/sun.svg";
import exercise from "../assets/exercise.svg";
import living from "../assets/living.svg";
import data from "../assets/data.svg";
import education from "../assets/education.svg";

export default function Dashboard() {
  const [error, setError] = React.useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogOut() {
    setError("");
    try {
      await logout();
      history("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div class="universalLogoHeading">
        <h1> Osteoporosis Tracker</h1>
        <img src={logo} alt="logo" width="170" height="190" />
      </div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Welcome </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>

      <div className="w-100 text-center mt-2">
        <div className="d-flex justify-content-around flex-wrap">
          <Link to="/diet" className="biggerSquareButton">
            <img src={diet} alt="diet" width="50" height="50" />
          </Link>

          <Link to="/exercise" className="biggerSquareButton">
            <img src={exercise} alt="exercise" width="50" height="50" />
          </Link>

          <Link to="/sun" className="biggerSquareButton">
            <img src={sun} alt="sun" width="50" height="50" />
          </Link>

          <Link to="/education" className="biggerSquareButton">
            <img src={education} alt="education" width="50" height="50" />
          </Link>

          <Link to="/livingenvironment" className="biggerSquareButton">
            <img src={living} alt="living" width="50" height="50" />
          </Link>

          <Link to="/data" className="biggerSquareButton">
            <img src={data} alt="data" width="50" height="50" />
          </Link>
        </div>
      </div>
    </>
  );
}