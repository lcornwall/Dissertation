import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg";


export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/dashboard")
    } catch{
      setError("Failed to sign in - incorrect password or account not created");
    }
    setLoading(false);
  }

  return (
    <>
      <div class="universalLogoHeading">
        <h1> Osteoporosis Tracker</h1>
        <img src={logo} alt="logo" width="170" height="190" />
      </div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <br></br>
            <Button disabled={loading} className="w-100" style={{ backgroundColor: '#11b3b3', color: 'white', border: '1px solid #11b3b3' }} type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      Need to make an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}