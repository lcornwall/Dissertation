import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, set, update } from "firebase/database";
import { auth } from '../firebase';
import logo from "../assets/logo.svg";

export default function Exercise() {
    const [exerciseType, setExerciseType] = useState('');
    const [newExerciseType, setNewExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isNewTypeValid, setIsNewTypeValid] = useState(true);
    const [existingTypes, setExistingTypes] = useState([]);
    const [exerciseLog, setExerciseLog] = useState({});
    const [noExerciseDone, setNoExerciseDone] = useState(false);

    const fetchExerciseTypes = async () => {
        const userID = auth.currentUser.uid;
        const db = getDatabase();
        const exerciseLogsRef = ref(db, `Exercise/${userID}/exerciseLogs`);
    
        try {
            const exerciseLogsSnapshot = await get(exerciseLogsRef);
            if (exerciseLogsSnapshot.exists()) {
                const exerciseLogs = exerciseLogsSnapshot.val();
                const types = new Set();
                for (const logEntry of Object.values(exerciseLogs)) {
                    for (const type of Object.keys(logEntry)) {
                        types.add(type.toLowerCase());
                    }
                }
                setExistingTypes([...types]);
            } else {
                console.log('No existing exercise logs found in database.');
                setExistingTypes([]); 
            }
        } catch (error) {
            console.error('Error fetching exercise logs:', error);
        }
    };

    const fetchExerciseLog = async () => {
        const userID = auth.currentUser.uid;
        const db = getDatabase();
        const today = new Date().toISOString().split('T')[0];
        const exerciseLogRef = ref(db, `Exercise/${userID}/exerciseLogs/${today}`);

        const logSnapshot = await get(exerciseLogRef);
        if (logSnapshot.exists()) {
            setExerciseLog(logSnapshot.val());
            setNoExerciseDone(false);
        } else {
            setExerciseLog({});
            setNoExerciseDone(true);
        }
    };

    useEffect(() => {
        fetchExerciseTypes().then(() => {
            console.log('Exercise types after fetching:', existingTypes); 
        });
        fetchExerciseLog();
    }, []);

    const validateDuration = (input) => {
        const reg = /^\d+(\.\d+)?$/;
        return reg.test(input);
    };

    const handleDurationChange = (e) => {
        const value = e.target.value;
        setDuration(value);
        setIsValid(validateDuration(value));
    };

    const handleNewExerciseTypeChange = (e) => {
        const value = e.target.value;
        setNewExerciseType(value);
        setIsNewTypeValid(value.length > 0 && value.length <= 50 && isNaN(value));
        if (value) setExerciseType('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid || !validateDuration(duration)) {
            alert("Please enter a valid whole number or decimal value for duration.");
            return;
        }

        if (!isNewTypeValid) {
            alert("Please enter a valid exercise type (not only numbers and max 50 characters).");
            return;
        }

        const typeToLog = (newExerciseType || exerciseType).toLowerCase();
        if (!typeToLog) {
            alert("Please select or enter an exercise type.");
            return;
        }

        const userID = auth.currentUser.uid;
        const db = getDatabase();
        const today = new Date().toISOString().split('T')[0];
        const typeRef = ref(db, `Exercise/${userID}/exerciseLogs/${today}/${typeToLog}`);

        try {
            const snapshot = await get(typeRef);
            if (snapshot.exists()) {
                const currentDuration = snapshot.val() || 0;
                const updatedDuration = (parseFloat(currentDuration) + parseFloat(duration)).toFixed(2);
                await update(typeRef.parent, { [typeToLog]: updatedDuration });
            } else {
                await set(typeRef, parseFloat(duration).toFixed(2));
            }

            if (!existingTypes.includes(typeToLog)) {
                await fetchExerciseTypes();
            }

            setExerciseType('');
            setNewExerciseType('');
            setDuration('');

            await fetchExerciseLog();
        } catch (error) {
            console.error("Error updating the exercise log", error);
            alert("An error occurred while updating the exercise log.");
        }
    };

    const navigateToHome = () => {
        window.location.href = '/dashboard';
    };

    return (
        <>
            <div className="landingContainer">
                <h1 className="welcomeHeading">Exercise Tracking</h1>
                <br></br>
                <img src={logo} alt="logo" width="400" height="200" />
                <br></br>
                <button onClick={navigateToHome} className="homeButton">Home</button>
                <br></br>
                <p>You can get exercise advice on the <a href="/education">education page</a>.</p>
                <div className="exerciseLogDisplay">
                    {noExerciseDone ? (
                        <p>No exercise done today.</p>
                    ) : (
                        Object.entries(exerciseLog).map(([type, loggedDuration]) => (
                            <p key={type}>{type}: {Number(loggedDuration).toFixed(2)} hours</p>
                        ))
                    )}
                </div>
                <div className="formContainer">
                    <form onSubmit={handleSubmit} className="exerciseForm">
                        <div className="formGroup">
                            <label htmlFor="existingType" className="formLabel">Choose an Exercise Type:</label>
                            <select
                                id="existingType"
                                className="formSelect"
                                value={exerciseType}
                                onChange={(e) => {
                                    setExerciseType(e.target.value);
                                    if (e.target.value) setNewExerciseType('');
                                }}
                                disabled={newExerciseType !== ''}
                            >
                                <option value="">Select an Exercise</option>
                                {existingTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="formGroup">
                            <label htmlFor="newType" className="formLabel">Or Add a New Type:</label>
                            <input
                                type="text"
                                id="newType"
                                className="formInput"
                                value={newExerciseType}
                                onChange={handleNewExerciseTypeChange}
                                disabled={exerciseType !== ''}
                            />
                            {!isNewTypeValid && <div className="error">Invalid exercise type. Ensure it's not only numbers and max 50 characters.</div>}
                        </div>
                        <div className="formGroup">
                            <label htmlFor="duration" className="formLabel">Duration (hours):</label>
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
