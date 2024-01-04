import React, { useState, useEffect } from 'react';
import { storage, auth } from '../firebase';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Diet() {
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();

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
        <p>You can get diet advice on the <a href="/education">education page</a>.</p>
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
