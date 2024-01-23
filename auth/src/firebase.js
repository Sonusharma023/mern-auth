// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-b4ec5.firebaseapp.com",
  projectId: "auth-b4ec5",
  storageBucket: "auth-b4ec5.appspot.com",
  messagingSenderId: "183384366784",
  appId: "1:183384366784:web:799298583465e4a8119725"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);