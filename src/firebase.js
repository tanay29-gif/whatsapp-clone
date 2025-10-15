import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCs318hjwaNxDAdBtQwxQE6coH8eO_vXK8",
  authDomain: "whats-5e636.firebaseapp.com",
  projectId: "whats-5e636",
  databaseURL: "https://whats-5e636-default-rtdb.firebaseio.com/",
  storageBucket: "whats-5e636.firebasestorage.app",
  messagingSenderId: "12085081431",
  appId: "1:12085081431:web:c055c37dd30c4e85073a12"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
export const timestamp = serverTimestamp;

export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export default app;