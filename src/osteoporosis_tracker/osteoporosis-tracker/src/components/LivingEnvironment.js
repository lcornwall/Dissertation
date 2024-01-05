import React, { useState, useEffect } from 'react';
import { storage, auth } from '../firebase';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function LivingEnvironment() {
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();

  const saveImagesToLocalStorage = (images) => {
    localStorage.setItem('uploadedImages', JSON.stringify(images));
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

    const imagesRef = storage.ref().child(`living_tracking`);
    imagesRef.listAll().then((result) => {
        const imagePromises = result.items.map((imageRef) => {
            if (imageRef.name.startsWith(userID)) {
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
      const fileRef = storage.ref(`living_tracking/${userID}_${timestamp}_${file.name}`);

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
        <h1 className="welcomeHeading">Living Environment Tracking</h1>
        <img src={logo} alt="logo" width="400" height="200" />
        <br></br>
        <button onClick={navigateToHome} className="homeButton">Home</button>
        <br></br>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={uploadFiles}>Upload</button>
        <br></br>
        <p className="advice"> It is recommend you take photographs of places you access regularly in your living place to spot potential fall dangers. 
         We recommend you upload new photographs if your living conditions change. </p>
        <br></br>
        <p> Your Latest Living Environment Photographs: </p>
        <div className="imageGallery">
          {uploadedImages.map((image) => {
            const imageNameParts = image.name.split('_');
            const datePart = imageNameParts[1].split('T')[0];

            return (
              <div key={image.name}>
                <img src={image.url} alt={image.name.split('/').pop()} />
                <p>{datePart}</p> 
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
