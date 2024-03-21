# Readme

The code presented is a React website connected to a Firebase backend. 

The only file directory that has code I have created is src.

Inside the \osteoporosis_tracker\osteoporosis-tracker\src directory we have:

- an assets directory - which contains the images used on the website.
- a components directory - which has all the .js files for login, signup, diet page, etc. 
- a contexts directory - which hosts AuthContext.js, for managing state for login/signup/signout.
- an App.css file - for most of the styling on the website.
- a firebase.js file - for connecting to our firebase backend.
- an index.css file - for site wide styling.
- an index.js file - for rendering the root component and attaching it to HTML. 

## Build instructions

### Requirements

Firstly you have to install the following on your machine (use pip install, or whatever is appropriate for installation on your machine):
1. npm (this was preferred, but yarn works too)
2. Node.js

Secondly, navigate to this directory \osteoporosis_tracker\osteoporosis-tracker.

Lastly, the package.json file will install all of the project dependencies for you. You can run `npm install` to do this. This may take a few minutes.

### Build steps

To run the website locally, you can run `npm start` in \osteoporosis_tracker\osteoporosis-tracker - which will run your website on localhost:someport on a web-browser. It may take a little longer on the first run! A few minutes is normal.

I make a build and deploy it to firebase from these commands (you will not be able to to do this (!!!), as my firebase requires authentication to deploy builds):

- `firebase login` 
- `firebase init` (makes the deployment build - makes a firebase dependencies json and build folder)
- `firebase deploy`

### Test step

No specific test suite, to run -  tested functionality when the website runs locally.

### Deployed website
If you want to view the deployed website, visit https://osteoporosis-app-develop-c49ef.web.app/
You can view the code on GitHub (https://github.com/lcornwall/Dissertation) but cloning is not advised due to the firebase.js store not being kept on GitHub for privacy and security reasons (contains all backend information so would be a huge vulnerability) and without firebase.js the localhost will not work as expected.
