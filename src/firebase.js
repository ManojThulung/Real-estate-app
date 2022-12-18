// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8G--6omxeJXm78cogJUu-_ZgSS92bBXs",
  authDomain: "real-estate-app-fc7cf.firebaseapp.com",
  projectId: "real-estate-app-fc7cf",
  storageBucket: "real-estate-app-fc7cf.appspot.com",
  messagingSenderId: "92464944449",
  appId: "1:92464944449:web:d1afcf8852eab7e90bfdc0",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
