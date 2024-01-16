import React, { useState, useEffect } from 'react';
import { storage, auth } from '../firebase';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';


export default function Diet() {
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();
  const [randomFact, setRandomFact] = useState('');

  const facts = [
    "A diet rich in calcium is crucial for bone health, as calcium is the primary mineral found in bones.",
    "Dairy products like milk, cheese, and yogurt are excellent sources of calcium, beneficial for preventing osteoporosis.",
    "Leafy green vegetables, such as kale, spinach, and broccoli, are good plant-based sources of calcium.",
    "Vitamin D is essential for calcium absorption; fatty fish, egg yolks, and fortified foods are key dietary sources.",
    "People at risk of osteoporosis are often advised to increase their intake of vitamin D through diet and supplements.",
    "Magnesium, found in nuts, seeds, whole grains, and green leafy vegetables, plays a role in bone health.",
    "Phosphorus, which works in tandem with calcium, is abundant in foods like meat, fish, and dairy.",
    "Potassium, found in bananas, oranges, and tomatoes, can neutralize bone-depleting acids in the diet.",
    "A diet high in sodium can cause calcium loss through the kidneys, negatively impacting bone density.",
    "Protein is important for bone health, but excessive animal protein intake may promote bone loss.",
    "Soy products like tofu and tempeh, rich in isoflavones, may have positive effects on bone health.",
    "Excessive caffeine consumption can interfere with calcium absorption and should be moderated.",
    "Almonds, sesame seeds, and chia seeds are not only rich in calcium but also in other bone-friendly nutrients.",
    "Vitamin K, found in green leafy vegetables and fermented foods, is important for bone health.",
    "Omega-3 fatty acids, found in fish and flaxseeds, may help maintain bone density.",
    "A balanced diet with adequate fruits and vegetables can help maintain an alkaline environment, beneficial for bones.",
    "Zinc and copper, trace minerals important for bone health, are found in nuts, seeds, and whole grains.",
    "Drinking alcohol in moderation is important, as excessive intake can increase the risk of osteoporosis.",
    "Prunes have been shown to have a positive effect on bone health due to their nutrient and antioxidant content.",
    "Incorporating whole grains into the diet provides essential nutrients for bone health.",
    "A Mediterranean diet, rich in fruits, vegetables, nuts, and olive oil, may be beneficial for bone health.",
    "Eating disorders like anorexia can severely impact bone density, emphasizing the importance of a balanced diet.",
    "Plant-based diets, when well-planned, can provide all the necessary nutrients for bone health.",
    "Adequate hydration is essential for overall health and can indirectly support bone health.",
    "A diet low in inflammatory foods can be beneficial for those with osteoporosis, as inflammation can impact bone health."
];

  const saveImagesToLocalStorage = (images) => {
    localStorage.setItem('uploadedImages', JSON.stringify(images));
  };

  const loadImagesFromLocalStorage = () => {
    const savedImages = localStorage.getItem('uploadedImages');
    return savedImages ? JSON.parse(savedImages) : [];
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            fetchImages(user.uid);
        } else {
            setUploadedImages([]);
            localStorage.removeItem('uploadedImages');
        }
    });

    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);

    return () => unsubscribe();
}, []);

const fetchImages = (userID) => {
    const today = new Date().toISOString().split('T')[0];

    const imagesRef = storage.ref().child(`diet_tracking`);
    imagesRef.listAll().then((result) => {
        const imagePromises = result.items.map((imageRef) => {
            if (imageRef.name.startsWith(userID) && imageRef.name.includes(today)) {
                return imageRef.getDownloadURL().then((url) => {
                    return { name: imageRef.name, url: url };
                });
            } else {
                return Promise.resolve(null);
            }
        });

        Promise.all(imagePromises).then(imageUrls => {
            const validImages = imageUrls.filter(image => image !== null);
            setUploadedImages(validImages);
        });
    }).catch((error) => {
        console.error("Error fetching images:", error);
    });
};




  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const navigateToHome = () => {
    navigate('/dashboard');
  };

  const uploadFiles = () => {
    const user = auth.currentUser;
    if (!user) return;
    const userID = user.uid;

    Array.from(files).forEach((file) => {
      const timestamp = new Date().toISOString();
      const fileRef = storage.ref(`diet_tracking/${userID}_${timestamp}_${file.name}`);

      fileRef.put(file).then(() => {
        return fileRef.getDownloadURL();
      })
      .then((downloadURL) => {
        const newImage = { name: file.name, url: downloadURL };
        setUploadedImages(prevImages => {
          const updatedImages = [...prevImages, newImage];
          saveImagesToLocalStorage(updatedImages);
          return updatedImages;
        });
      })
      .catch((error) => {
        console.error('Error uploading file:', file.name, error);
      });
    });
  };

  return (
    <>
      <div className="landingContainer">
        <h1 className="welcomeHeading">Diet Tracking</h1>
        <img src={logo} alt="logo" width="400" height="200" />
        <br></br>
        <button onClick={navigateToHome} className="homeButton">Home</button>
        <br></br>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={uploadFiles}>Upload</button>
        <br></br>
        <p>You can get diet advice on the <a href="https://osteoporosis-app-develop-c49ef.web.app/education">education page</a>.</p>
        <p><strong>Diet fact for osteoporosis: {randomFact}</strong></p>
        <br></br>
        <p> Your food and drink uploads for today: </p>
        <div className="imageGallery">
          {uploadedImages.map((image) => (
            <div key={image.name}>
              <img src={image.url} alt={image.name.split('/').pop()} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
