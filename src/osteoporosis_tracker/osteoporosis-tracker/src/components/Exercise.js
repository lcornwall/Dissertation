import React, { useState, useEffect } from "react";
import { getDatabase, ref, child, get, set, update } from "firebase/database";
import { auth } from '../firebase'; 
import logo from "../assets/logo.svg";

export default function Exercise() {
    const [exerciseType, setExerciseType] = useState('');
    const [newExerciseType, setNewExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isNewTypeValid, setIsNewTypeValid] = useState(true);
    const [existingTypes, setExistingTypes] = useState([]);

    useEffect(() => {
        const fetchExerciseTypes = async () => {
            const userID = auth.currentUser.uid;
            const db = getDatabase();
            const today = new Date().toISOString().split('T')[0];
            const exerciseLogsRef = ref(db, `Exercise/${userID}/exerciseLogs/${today}`);

            const snapshot = await get(exerciseLogsRef);
            if (snapshot.exists()) {
                setExistingTypes(Object.keys(snapshot.val()));
            }
        };

        fetchExerciseTypes();
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

        // Validate new exercise type
        if (value.length > 0 && value.length <= 50 && isNaN(value)) {
            setIsNewTypeValid(true);
        } else {
            setIsNewTypeValid(false);
        }

        if (value) setExerciseType('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid || duration.trim() === '') {
            alert("Please enter a valid whole number or decimal value for duration.");
            return;
        }

        if (!isNewTypeValid) {
            alert("Please enter a valid exercise type (not only numbers and max 50 characters).");
            return;
        }

        const typeToLog = newExerciseType || exerciseType;
        if (!typeToLog) {
            alert("Please select or enter an exercise type.");
            return;
        }

        const userID = auth.currentUser.uid;
        const db = getDatabase();
        const today = new Date().toISOString().split('T')[0];
        const typeRef = ref(db, `Exercise/${userID}/exerciseLogs/${today}/${typeToLog}`);

        const snapshot = await get(typeRef);
        if (snapshot.exists()) {
            const currentDuration = snapshot.val() || 0;
            const updatedDuration = currentDuration + parseFloat(duration);
            await update(typeRef.parent, { [typeToLog]: updatedDuration });
        } else {
            await set(typeRef, parseFloat(duration));
        }

        if (!existingTypes.includes(typeToLog)) {
            setExistingTypes([...existingTypes, typeToLog]);
        }

        setExerciseType('');
        setNewExerciseType('');
        setDuration('');
    };

    const navigateToHome = () => {
        window.location.href = '/dashboard';
    };

    return (
        <>
            <div className="landingContainer">
                <h1 className="welcomeHeading">Exercise Tracking</h1>
                <img src={logo} alt="logo" className="logo" />
                <br></br>
                <button onClick={navigateToHome} className="homeButton">Home</button>
                <br></br>
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