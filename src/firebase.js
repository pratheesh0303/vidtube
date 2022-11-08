// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5roVhz5D-9p_TVUREegAm1pjL2IFRnko",
  authDomain: "vidtube-3dabd.firebaseapp.com",
  projectId: "vidtube-3dabd",
  storageBucket: "vidtube-3dabd.appspot.com",
  messagingSenderId: "487299478605",
  appId: "1:487299478605:web:392055b2bfee81461c5804",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
