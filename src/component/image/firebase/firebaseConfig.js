import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyD8ffJZNAhJg3059gBkzXp3yXjYL4_xpBY",
    authDomain: "strogeimage.firebaseapp.com",
    projectId: "strogeimage",
    storageBucket: "strogeimage.appspot.com",
    messagingSenderId: "51270476640",
    appId: "1:51270476640:web:57572b88cfe3c796587405",
    measurementId: "G-JWRMPZCNTB"
};

// Initialize Firebase app only once
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, storage };