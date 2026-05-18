import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "1:331611143469:web:76888db0d5a9c56c34e7a4",
  authDomain: "walk4warriors.firebaseapp.com",
  projectId: "walk4warriors",
  storageBucket: "walk4warriors.firebasestorage.app",
  messagingSenderId: "331611143469",
  appId: "1:331611143469:web:76888db0d5a9c56c34e7a4",
  measurementId: "G-JG81T9PPJB",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);