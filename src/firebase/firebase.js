// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as fb from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzOFzdrqzsmsB6qaz9CVC1xfv9ORaGP8E",
  authDomain: "chatappvue3.firebaseapp.com",
  databaseURL:
    "https://chatappvue3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatappvue3",
  storageBucket: "chatappvue3.appspot.com",
  messagingSenderId: "334516852614",
  appId: "1:334516852614:web:b4af504d9ed8111b1c3e07",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export { fb };
