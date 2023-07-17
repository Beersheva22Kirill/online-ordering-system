// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAadKjZinCrQtUsdVNF9bWvL5UCcsuI89M",
  authDomain: "online-orders-system.firebaseapp.com",
  projectId: "online-orders-system",
  storageBucket: "online-orders-system.appspot.com",
  messagingSenderId: "942350813464",
  appId: "1:942350813464:web:8b9a6a4179159be80db66d"
};

// Initialize Firebase
export const oosApp = initializeApp(firebaseConfig);
export const storage = getStorage(oosApp);