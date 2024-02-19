// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBo3WVJhUdwBFVT3O_3xYrpAxr85HGdaho",
    authDomain: "simplechat4192499.firebaseapp.com",
    projectId: "simplechat4192499",
    storageBucket: "simplechat4192499.appspot.com",
    messagingSenderId: "837244596556",
    appId: "1:837244596556:web:b7c5316a643856e01c9fe9",
    measurementId: "G-QJB76STYQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);