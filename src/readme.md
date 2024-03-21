# Readme

The code presented is a React website connected to a Firebase backend. 

To find the code:

Firstly, navigate to this directory \src\osteoporosis_tracker\osteoporosis-tracker OR clone the repository from here https://github.com/lcornwall/Dissertation

The only file directory we are concerned with is src. Every other folder contains node modules, firebase files, react premade 404 pages, etc. - none of this code was made or edited by myself. 

Inside the src directory we have:

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

Once these are installed, the package.json file will install all of the dependencies for you. You can run `npm install` to do this.

### Build steps

To run the website locally, you can run `npm start` - which will run your website on localhost:someport on a web-browser. It may take a little longer on the first run!

I make a build and deploy it to firebase from these commands (you will not be able to to do this, as my firebase requires authentication to deploy builds):

- `firebase login` 
- `firebase init` (does the build)
- `firebase deploy`

The command `npm run build` runs a build.

### Test step

No specific test suite, to run -  test functionality when the website runs locally.

### Deployed website
If you want to view the deployed website, visit https://osteoporosis-app-develop-c49ef.web.app/

