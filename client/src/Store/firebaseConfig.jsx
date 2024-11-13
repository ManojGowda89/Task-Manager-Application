
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDg4SKbMUoxqBpHGT8_MEp6QrfuKXuMovc",
    authDomain: "task-manager-95453.firebaseapp.com",
    projectId: "task-manager-95453",
    storageBucket: "task-manager-95453.firebasestorage.app",
    messagingSenderId: "112129842280",
    appId: "1:112129842280:web:d3ca4398d5b24ea272afdd"
  };
  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
