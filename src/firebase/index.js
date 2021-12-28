// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7xyCiXFiGA8pWxaZXWVEG3n_peTzFym0",
  authDomain: "webshop-d0cf0.firebaseapp.com",
  projectId: "webshop-d0cf0",
  storageBucket: "webshop-d0cf0.appspot.com",
  messagingSenderId: "310496999328",
  appId: "1:310496999328:web:dc2cea2ef6f70be62296c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);