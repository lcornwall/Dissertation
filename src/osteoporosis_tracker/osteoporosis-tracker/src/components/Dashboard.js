import React , {useState, useEffect } from "react";
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
  const [randomFact, setRandomFact] = useState('');

  const facts = [
    "Osteoporosis is a bone disease characterized by decreased bone density and mass, making bones fragile and more prone to fractures.",
    "It is often called a “silent disease” because it can progress without symptoms until a bone breaks.",
    "Women are more likely to develop osteoporosis than men, especially post-menopause due to lower estragon levels.",
    "Calcium and vitamin D are crucial for bone health, and a deficiency can lead to osteoporosis.",
    "Weight-bearing exercises like walking, jogging, and strength training can help prevent and manage osteoporosis.",
    "Smoking and excessive alcohol consumption are significant risk factors for developing osteoporosis.",
    "Osteoporosis can be diagnosed using a bone density test, often called a DEXA scan.",
    "Genetic factors play a significant role in determining bone density and susceptibility to osteoporosis.",
    "People with osteoporosis often experience a decrease in height over time due to compression fractures in the spine.",
    "Osteoporosis-related fractures most commonly occur in the hip, wrist, or spine.",
    "Prevention strategies for osteoporosis include a healthy diet, regular exercise, and lifestyle modifications.",
    "Some medications, like corticosteroids, can increase the risk of developing osteoporosis.",
    "Hormone replacement therapy (HRT) can help prevent osteoporosis in postmenopausal women but has associated risks.",
    "Osteoporosis is not just a women's disease; older men are also at significant risk.",
    "A family history of osteoporosis or bone fractures increases the risk of developing the condition.",
    "Early detection of osteoporosis is crucial for effective treatment and prevention of fractures.",
    "Certain medical conditions, such as rheumatoid arthritis and hyperthyroidism, are associated with an increased risk of osteoporosis.",
    "Osteoporosis can lead to chronic pain and disability, especially in the case of spinal or hip fractures.",
    "Adequate protein intake is important for bone health and can be a factor in preventing osteoporosis.",
    "Osteoporosis is a global health issue affecting millions of people worldwide.",
    "Vitamin K and magnesium are other nutrients important for bone health and the prevention of osteoporosis.",
    "Bisphosphonates are a class of drugs commonly used to treat osteoporosis and reduce the risk of bone fractures.",
    "Ethnicity plays a role in osteoporosis risk, with Caucasian and Asian populations having a higher prevalence.",
    "Osteoporosis is more common in older adults, but it can also affect younger individuals.",
    "Regular monitoring and a personalized treatment plan are key in managing osteoporosis effectively."
];

useEffect(() => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  setRandomFact(facts[randomIndex]);
}, []);

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
          <br></br>
          <strong> Random Osteoporosis fact: </strong>{randomFact} 
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


          <Link to="/livingenvironment" className="biggerSquareButton">
            <img src={living} alt="living" width="50" height="50" />
          </Link>

          <Link to="/education" className="nonTrackingButtons">
            <img src={education} alt="education" width="50" height="50" />
          </Link>

          <Link to="/data" className="nonTrackingButtons">
            <img src={data} alt="data" width="50" height="50" />
          </Link>
        </div>
      </div>
    </>
  );
}