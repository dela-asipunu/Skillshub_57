import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzVQXX8lThRNKKyLwU_5Jaj6zckH1XmVI",
  authDomain: "skillshub-b4735.firebaseapp.com",
  projectId: "skillshub-b4735",
  storageBucket: "skillshub-b4735.firebasestorage.app",
  messagingSenderId: "935090027498",
  appId: "1:935090027498:web:159c35364dcd4d74351093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);