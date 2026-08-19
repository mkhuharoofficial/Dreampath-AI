import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  reload,
  applyActionCode,
  User as FirebaseUser 
} from "firebase/auth";
import { 
  initializeFirestore,
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc, 
  getDoc, 
  setDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqydknT26XWjAX-4cwpiI-PgzNfqPkeM0",
  authDomain: "dreampath-ai-7268b.firebaseapp.com",
  projectId: "dreampath-ai-7268b",
  storageBucket: "dreampath-ai-7268b.firebasestorage.app",
  messagingSenderId: "962732979400",
  appId: "1:962732979400:web:6cae55f2eae043535721fd",
  measurementId: "G-SCH9Q5X6HB"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore with auto long-polling detection for robust connectivity across browser and iframe environments
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  reload,
  applyActionCode,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
};
export type { FirebaseUser };
