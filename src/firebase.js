// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyfRAKDfiWnwjJr6iDPEHxYVTbmkwvJmA",
  authDomain: "fir-crud-blog.firebaseapp.com",
  projectId: "fir-crud-blog",
  storageBucket: "fir-crud-blog.firebasestorage.app",
  messagingSenderId: "1021183928383",
  appId: "1:1021183928383:web:021de315bad3d6f0c6b08a",
  measurementId: "G-75PR85RWGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);