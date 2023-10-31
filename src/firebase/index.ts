// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJDvxpfFuYKiLy17YzsgI2L6dLG2f9U04",
  authDomain: "todo-app-a871b.firebaseapp.com",
  projectId: "todo-app-a871b",
  storageBucket: "todo-app-a871b.appspot.com",
  messagingSenderId: "311787753999",
  appId: "1:311787753999:web:4903371ff3663797c3897a",
  measurementId: "G-0DCWSZFF10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// connectAuthEmulator(auth, "http://127.0.0.1:9099");
