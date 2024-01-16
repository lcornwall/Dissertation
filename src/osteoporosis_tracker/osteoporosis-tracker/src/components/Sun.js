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
    const [randomFact, setRandomFact] = useState('');

    const facts = [
        "Sun exposure is the primary natural source of Vitamin D, which is crucial for calcium absorption and bone health.",
        "Vitamin D produced by the skin during sun exposure helps regulate calcium levels, vital for preventing osteoporosis.",
        "People living in regions with less sunshine may have a higher risk of Vitamin D deficiency and, consequently, osteoporosis.",
        "The body's ability to produce Vitamin D decreases with age, increasing the risk of osteoporosis in older adults.",
        "Winter months with shorter daylight hours can lead to decreased Vitamin D synthesis, potentially affecting bone density.",
        "Using sunscreen, while important for skin cancer prevention, can reduce the skin's ability to produce Vitamin D.",
        "Cloudy weather can significantly reduce the amount of UVB radiation reaching the skin, decreasing Vitamin D synthesis.",
        "The recommended daily exposure to sunlight for adequate Vitamin D varies based on skin type, location, and time of year.",
        "People with darker skin need longer sun exposure to produce the same amount of Vitamin D as those with lighter skin.",
        "Vitamin D supplements are often recommended for people in areas with limited sun exposure to reduce osteoporosis risk.",
        "Seasonal variations in sunlight exposure can cause fluctuations in Vitamin D levels, potentially impacting bone health.",
        "Vitamin D deficiency is more common in regions far from the equator where sunlight intensity is lower.",
        "Air pollution can reduce the amount of UVB radiation reaching the Earth's surface, impacting Vitamin D synthesis.",
        "Wearing clothing that covers most of the skin can significantly reduce Vitamin D production from sun exposure.",
        "The angle of the sun's rays affects UVB intensity; the sun is less effective at producing Vitamin D in the early morning and late afternoon.",
        "Vitamin D plays a role in muscle function, and its deficiency can increase the risk of falls, leading to osteoporotic fractures.",
        "Indoor lifestyles and office jobs reduce sun exposure, contributing to lower Vitamin D levels and potential bone health issues.",
        "Glass windows block most UVB rays, so being indoors does not contribute to Vitamin D production even in sunny weather.",
        "The body can store Vitamin D from summer sun exposure, but reserves can deplete during winter, affecting bone health.",
        "Latitudes above 37 degrees north or below 37 degrees south have a higher risk of Vitamin D deficiency due to less intense sunlight.",
        "Overexposure to the sun increases the risk of skin damage and cancer, so balanced sun exposure is key.",
        "Certain climates with frequent rain or cloud cover pose a challenge for adequate sun-induced Vitamin D synthesis.",
        "Vitamin D levels can be measured through blood tests to assess the risk of osteoporosis and determine supplementation needs.",
        "Excessive Vitamin D supplementation without medical supervision can lead to toxicity and adverse health effects.",
        "Seasonal affective disorder (SAD) in darker months can indirectly affect lifestyle choices impacting bone health, such as exercise and diet."
    ];    

    useEffect(() => {
        getTodaysLogs().then(setTodayLogs).catch(error => {
            console.error("Error fetching today's logs:", error);
            setTodayLogs('Error fetching data');
        });
        const randomIndex = Math.floor(Math.random() * facts.length);
        setRandomFact(facts[randomIndex]);
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
                <img src={logo} alt="logo" width="400" height="200" />
                <br></br>
                <button onClick={navigateToHome} className="homeButton">Home</button>
                <br></br>
                <p>You can get vitamin D advice on the <a href="https://osteoporosis-app-develop-c49ef.web.app/education">education page</a>.</p>
                <p><strong>Sun/vitamin D fact for osteoporosis: {randomFact}</strong></p>
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
