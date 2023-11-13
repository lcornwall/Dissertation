import { Card, Button, Alert } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Dashboard(){

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth()
    const history = useNavigate()

    async function handleLogOut(){
    setError('')
    try{
        await logout()
        history('/')
    }catch{
        setError("Failed to log out")
    }
    }

    return (
        <>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4"> Welcome </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email: </strong>{currentUser.email}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogOut}>Log Out</Button>
            </div>
        </>
    )

    
}