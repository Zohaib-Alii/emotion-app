import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDDr1vaSE7JyGW2a3fag91LXSeLweX4ugk",
  authDomain: "emotion-app-6dc50.firebaseapp.com",
  projectId: "emotion-app-6dc50",
  storageBucket: "emotion-app-6dc50.appspot.com",
  messagingSenderId: "723162425641",
  appId: "1:723162425641:web:31372cecb7471843a3af38",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
