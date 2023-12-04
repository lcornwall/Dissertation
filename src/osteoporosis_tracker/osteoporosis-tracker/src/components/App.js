import { AuthProvider } from "../contexts/AuthContext"
import Signup from "./Signup"
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from './PrivateRoute'
import Landing from "./Landing"
import Diet from "./Diet"
import Data from "./Data"
import Exercise from "./Exercise"
import Sun from "./Sun"
import LivingEnvironment from "./LivingEnvironment"
import Education from "./Education"
import "../App.css"
import "../index.css"

function App() {
  return (
    <AuthProvider>
      <Container 
        className="d-flex 
        align-items-center 
        justify-content-center"
        style={{ minHeight: 
        "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" Component={Landing} />
                <Route path="/signup" Component={Signup} />
                <Route path="/login" Component={Login} />

                <Route path="/dashboard" Component={PrivateRoute}>
                  <Route exact path="/dashboard" Component={Dashboard}/>
                </Route>

                <Route path="/diet" Component={PrivateRoute}>
                  <Route exact path="/diet" Component={Diet}/>
                </Route>

                <Route path="/data" Component={PrivateRoute}>
                  <Route exact path="/data" Component={Data}/>
                </Route>

                <Route path="/education" Component={PrivateRoute}>
                  <Route exact path="/education" Component={Education}/>
                </Route>

                <Route path="/sun" Component={PrivateRoute}>
                  <Route exact path="/sun" Component={Sun}/>
                </Route>

                <Route path="/livingenvironment" Component={PrivateRoute}>
                  <Route exact path="/livingenvironment" Component={LivingEnvironment}/>
                </Route>

                <Route path="/exercise" Component={PrivateRoute}>
                  <Route exact path="/exercise" Component={Exercise}/>
                </Route>

              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  </AuthProvider>
  );
}

export default App;