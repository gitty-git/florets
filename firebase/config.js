import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDc_oD5-y1oL1Lr-hscwUfvd-EpBNPcBzg",
    authDomain: "florets-site.firebaseapp.com",
    projectId: "florets-site",
    storageBucket: "florets-site.appspot.com",
    messagingSenderId: "623941495038",
    appId: "1:623941495038:web:127975fc5839f9b38fddaf"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore()

export { db }
