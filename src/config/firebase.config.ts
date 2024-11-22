// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPoVsYlm1JRpaozCN9wVcpJ_E8hhJbJJU",
  authDomain: "quick-update-7d03b.firebaseapp.com",
  projectId: "quick-update-7d03b",
  storageBucket: "quick-update-7d03b.firebasestorage.app",
  messagingSenderId: "700267925556",
  appId: "1:700267925556:web:700f3e297c76f0345c7a61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app,db, auth}