// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBUnuZJMrYw2iBjn-z3i_3rtmH0na7FP0I",
  authDomain: "food-share-d1cb4.firebaseapp.com",
  projectId: "food-share-d1cb4",
  storageBucket: "food-share-d1cb4.appspot.com",
  messagingSenderId: "748104775816",
  appId: "1:748104775816:web:7bd97f5453e446ce2a473d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)