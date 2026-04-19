import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOOJrEz-5JH8HiCrIm4wMbp9uXKUFXArk",
  authDomain: "mad-projects-759dc.firebaseapp.com",
  projectId: "mad-projects-759dc",
  storageBucket: "mad-projects-759dc.firebasestorage.app",
  messagingSenderId: "901272252787",
  appId: "1:901272252787:web:ec35dfa61709762f8f9506"
};

const app = initializeApp(firebaseConfig);

// Use this for React Native persistence (optional but recommended)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// OR if the above doesn't work, fallback to simple:
// export const auth = getAuth(app);

export const db = getFirestore(app);