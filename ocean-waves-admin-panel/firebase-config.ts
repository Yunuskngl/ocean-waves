// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmukWDs1jpL838_tI-mS1YokbRBkboPgU",
  authDomain: "ocean-waves-633b5.firebaseapp.com",
  projectId: "ocean-waves-633b5",
  storageBucket: "ocean-waves-633b5.firebasestorage.app",
  messagingSenderId: "991710482900",
  appId: "1:991710482900:web:e8e537db4e176b45d58641",
  measurementId: "G-QRMCSQX1WR"
};

const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  getAnalytics(app);
}