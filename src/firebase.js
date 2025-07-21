import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import * as dotenv from 'dotenv';
// dotenv.config();

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCsjLWGFwuRPpST3Oj4knUthFIyjSzaISk",
  authDomain: "chatsandbot.firebaseapp.com",
  databaseURL: "https://chatsandbot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatsandbot",
  storageBucket: "chatsandbot.appspot.com",
  messagingSenderId: "124516482080",
  appId: "1:124516482080:web:24cbc950e7ac80d1e61045",
  measurementId: "G-L2NZSGNJHR"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
