import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { get, getDatabase, ref, set, update} from 'firebase/database';

const app = firebase.initializeApp({
    apiKey: "AIzaSyB_DD9B7_JPUHK2MOFFfZMBSMZvEFXxFdY",
    authDomain: "osteoporosis-app-develop-c49ef.firebaseapp.com",
    databaseURL: "https://osteoporosis-app-develop-c49ef-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "osteoporosis-app-develop-c49ef",
    storageBucket: "osteoporosis-app-develop-c49ef.appspot.com",
    messagingSenderId: "146812409442",
    appId: "1:146812409442:web:7f5b6d62184af8c666233b"
})

export function writeUserData(userID, email){
    const db = getDatabase();
    const reference = ref(db, 'Users/' + userID)
    const sunReference = ref(db, 'Sun/' + userID)
    const exerciseReference = ref(db, 'Exercise/' + userID)

    set(reference, {
        email: email
    })

    set(sunReference, {
        sunLogs: ""
    })

    set(exerciseReference, {
        exerciseLogs: ""
    })
    
}

export const auth = app.auth()
export const storage = app.storage()
export default app
