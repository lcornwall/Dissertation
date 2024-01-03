import React, { useState } from "react";
import { getDatabase, ref, child, get, set, update } from "firebase/database";
import { auth } from '../firebase'; 
import logo from "../assets/logo.svg";

export default function Sun() {
    const [duration, setDuration] = useState('');
    const [isValid, setIsValid] = useState(true);

    const validateInput = (input) => {
        const reg = /^\d+(\.\d+)?$/; 
        return reg.test(input);
    };

    const handleDurationChange = (e) => {
        const value = e.target.value;
        setDuration(value);
        setIsValid(validateInput(value)); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid || duration.trim() === '') {
            alert("Please enter a valid whole number or decimal value.");
            return;
        }

        const userID = auth.currentUser.uid;
        const db = getDatabase();
        const today = new Date().toISOString().split('T')[0];
        const sunLogsRef = ref(db, `Sun/${userID}/sunLogs`);

        const snapshot = await get(child(sunLogsRef, today));
        if (snapshot.exists()) {
            const currentDuration = snapshot.val() || 0;
            const updatedDuration = currentDuration + parseFloat(duration); 
            update(sunLogsRef, { [today]: updatedDuration });
        } else {
            set(child(sunLogsRef, today), parseFloat(duration));
        }

        setDuration('');
        setIsValid(true); 
    };


    const navigateToHome = () => {
        window.location.href = '/dashboard';
    }; 
    
    return (
        <>
            <div className="landingContainer">
                <h1 className="welcomeHeading">Sun Tracking</h1>
                <br></br>
                <img src={logo} alt="logo" className="logo" />
                <br></br>
                <button onClick={navigateToHome} className="homeButton">Home</button>
                <div className="formContainer">
                    <form onSubmit={handleSubmit} className="sunTrackingForm">
                        <div className="formGroup">
                            <label htmlFor="duration" className="formLabel">Hours in Sun:</label>
                            <input
                                type="number"
                                id="duration"
                                className="formInput"
                                value={duration}
                                onChange={handleDurationChange}
                                required
                            />
                            {!isValid && <div className="error">Invalid input: please enter a whole number or decimal.</div>}
                        </div>
                        <div className="formGroup">
                            <button type="submit" className="submitBtn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
