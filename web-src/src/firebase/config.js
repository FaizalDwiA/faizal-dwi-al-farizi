import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDy3Hcnvz8XGXPEwEZxk9wnOSieEcUF5yc",
  authDomain: "portofolio-45efd.firebaseapp.com",
  projectId: "portofolio-45efd",
  storageBucket: "portofolio-45efd.firebasestorage.app",
  messagingSenderId: "751106659000",
  appId: "1:751106659000:web:70930243808fa4f6015a4d",
  measurementId: "G-V7MXSSB8MB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

