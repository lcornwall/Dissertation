import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from '../firebase';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import logo from "../assets/logo.svg";
import { storage } from '../firebase';

export default function Data() {
    const [availableDates, setAvailableDates] = useState([]);
    const [exerciseLog, setExerciseLog] = useState({});
    const [sunExposure, setSunExposure] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [sunChartData, setSunChartData] = useState(null); 
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (auth.currentUser) {
            fetchAvailableDates(auth.currentUser.uid);
        }
    }, [auth.currentUser]);

    useEffect(() => {
        if (selectedDate) {
            fetchExerciseLog(selectedDate);
            fetchSunExposure(selectedDate);
            fetchImages(auth.currentUser.uid, selectedDate);
        } else {
            setUploadedImages([]);
            setChartData(null);
            setSunChartData(null);
        }
    }, [selectedDate]);
    

    useEffect(() => {
        if (Object.keys(exerciseLog).length) {
            prepareChartData();
        }
    }, [exerciseLog]);
    

    useEffect(() => {
        if (sunExposure !== null) {
            prepareSunChartData();
        }
    }, [sunExposure]);

    const fetchAvailableDates = async (userID) => {
    const db = getDatabase();
    const exerciseRef = ref(db, `Exercise/${userID}/exerciseLogs`);
    const sunRef = ref(db, `Sun/${userID}/sunLogs`);
    const imagesRef = storage.ref().child('diet_tracking');

    try {
        const [exerciseSnapshot, sunSnapshot, imageResult] = await Promise.all([
            get(exerciseRef),
            get(sunRef),
            imagesRef.listAll()
        ]);

        const exerciseDates = exerciseSnapshot.exists() ? Object.keys(exerciseSnapshot.val()) : [];
        const sunDates = sunSnapshot.exists() ? Object.keys(sunSnapshot.val()) : [];

        const imageDates = imageResult.items
            .map(item => {
                const parts = item.name.split('_');

                if (parts.length > 1 && parts[0] === userID) {
                    return parts[1].split('T')[0];
                }
                return null;
            })
            .filter((date, index, self) => date && self.indexOf(date) === index); 

        const combinedDates = [...new Set([...exerciseDates, ...sunDates, ...imageDates])].sort().reverse();

        setAvailableDates(combinedDates);
    } catch (error) {
        console.error("Error fetching available dates:", error);
    }
};




    const fetchImages = (userID, date) => {
        console.log(`fetchImages called with date: '${date}', type: ${typeof date}`);
        if (!date) {
            console.log("No date selected, no images to fetch.");
            return;
        }
        const imagesRef = storage.ref().child('diet_tracking');
        imagesRef.listAll().then((result) => {
            const imagePromises = result.items.map((imageRef) => {
                const expectedPrefix = `${userID}_${date}`;
                if (imageRef.name.startsWith(expectedPrefix)) {
                    return imageRef.getDownloadURL().then((url) => {
                        return { name: imageRef.name, url: url };
                    });
                }
                return Promise.resolve(null);
            });
    
            Promise.all(imagePromises).then(imageUrls => {
                const validImages = imageUrls.filter(image => image !== null);
                setUploadedImages(validImages);
            });
        }).catch((error) => {
            console.error("Error fetching images:", error);
        });
    };
    
    
    const fetchExerciseLog = async (date) => {
        const userID = auth.currentUser.uid;
        const db = getDatabase();
        const exerciseLogRef = ref(db, `Exercise/${userID}/exerciseLogs/${date}`);

        const logSnapshot = await get(exerciseLogRef);
        if (logSnapshot.exists()) {
            setExerciseLog(logSnapshot.val());
        } else {
            setExerciseLog({});
        }
    };

    const fetchSunExposure = async (date) => {
        const userID = auth.currentUser.uid;
        const db = getDatabase();
        const sunExposureRef = ref(db, `Sun/${userID}/sunLogs/${date}`);

        const sunSnapshot = await get(sunExposureRef);
        if (sunSnapshot.exists()) {
            setSunExposure(sunSnapshot.val() || 0);
        } else {
            setSunExposure(0);
        }
    };

    const prepareChartData = () => {
        const labels = Object.keys(exerciseLog);
        const data = Object.values(exerciseLog).map(duration => Number(duration));
    
        if (labels.length > 0 && data.length > 0) {
            setChartData({
                labels: labels,
                datasets: [{
                    label: 'Exercise Duration (hours)',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }]
            });
        } else {
            setChartData(null);
        }
    };
    
    const prepareSunChartData = () => {
        if (sunExposure > 0) {
            setSunChartData({
                labels: ['Sun Exposure'],
                datasets: [{
                    label: 'Sun Exposure Duration (hours)',
                    data: [sunExposure],
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                }]
            });
        } else {
            setSunChartData(null); 
        }
    };

    const navigateToHome = () => {
        window.location.href = '/dashboard';
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    


    return (
        <div className="landingContainer">
            <h1 className="welcomeHeading">Data Summary</h1>
            <br></br>
            <img src={logo} alt="logo" width="400" height="200" />
            <br></br>
            <button onClick={navigateToHome} className="homeButton">Home</button>
            <br></br>

            {availableDates.length > 0 && (
                <div>
                    <label htmlFor="dateSelector">Select a date: </label>
                    <select id="dateSelector" value={selectedDate || ""} onChange={handleDateChange}>
                        <option value="" disabled>Select a date</option>
                        {availableDates.map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="chartContainer">
                {selectedDate ? (
                    chartData ? (
                        <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
                    ) : (
                        <p>No exercise data available for this date.</p>
                    )
                ) : (
                    <p>Select a date to see exercise data.</p>
                )}
            </div>
            <div className="chartContainer">
                {selectedDate ? (
                    sunChartData ? (
                        <Bar data={sunChartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
                    ) : (
                        <p>No sun exposure data available for this date.</p>
                    )
                ) : (
                    <p>Select a date to see sun exposure data.</p>
                )}
            </div>
            <div className="imageGallery">
            {selectedDate && uploadedImages.length > 0 ? (
                <>
                    <p>Your food and drink uploads for the day:</p>
                    {uploadedImages.map((image) => (
                        <div key={image.name} className="imageItem">
                            <img src={image.url} alt={image.name.split('/').pop()} />
                        </div>
                    ))}
                </>
            ) : selectedDate ? (
                <p>No diet data available for this date.</p>
            ) : (
                <p>Select a date to see diet data.</p>
            )}
        </div>

        </div>
    );
}
