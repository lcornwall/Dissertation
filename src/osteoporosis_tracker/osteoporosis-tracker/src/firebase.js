import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyB_DD9B7_JPUHK2MOFFfZMBSMZvEFXxFdY",
    authDomain: "osteoporosis-app-develop-c49ef.firebaseapp.com",
    projectId: "osteoporosis-app-develop-c49ef",
    storageBucket: "osteoporosis-app-develop-c49ef.appspot.com",
    messagingSenderId: "146812409442",
    appId: "1:146812409442:web:7f5b6d62184af8c666233b"
})

export const auth = app.auth()
export default app