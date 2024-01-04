import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, child, get, set, update } from "firebase/database";
import { auth } from '../firebase'; 
import logo from "../assets/logo.svg";

export default function Sun() {
    const [duration, setDuration] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [todayLogs, setTodayLogs] = useState('Loading...');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        getTodaysLogs().then(setTodayLogs).catch(error => {
            console.error("Error fetching today's logs:", error);
            setTodayLogs('Error fetching data');
        });
    }, []);

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

        try {
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
            setSubmissionMessage('Your sun duration has been updated successfully!');
            setTodayLogs(todayLogs + parseFloat(duration));
        } catch (error) {
            console.error("Error updating sun duration:", error);
            alert("Error updating the data. Please try again.");
        }
    };

    const getTodaysLogs = async () => {
        const userID = auth.currentUser.uid;
        const db = getDatabase();
        const today = new Date().toISOString().split('T')[0];
        const sunLogsRef = ref(db, `Sun/${userID}/sunLogs`);
        const snapshot = await get(child(sunLogsRef, today));

        if (snapshot.exists()) {
            return snapshot.val() || 0;
        } else {
            return 0;
        }
    };

    const navigateToHome = () => {
        navigate('/dashboard'); 
    };

    return (
        <>
            <div className="landingContainer">
                <h1 className="welcomeHeading">Sun Tracking</h1>
                <br></br>
                <img src={logo} alt="logo" className="logo" />
                <br></br>
                <button onClick={navigateToHome} className="homeButton">Home</button>
                <br></br>
                <p>You can get vitamin D advice on the <a href="/education">education page</a>.</p>
                <br></br>
                
                <p>Your hours in the sun for today are: <span>{todayLogs}</span> hours</p>
                {submissionMessage && <p className="submissionMessage">{submissionMessage}</p>}

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
