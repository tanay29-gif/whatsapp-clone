import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const saveUserToFirestore = async (user) => {
  if (!user) return;

  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
     
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        lastSeen: serverTimestamp()
      });
    } else {
      
      await setDoc(userRef, {
        lastSeen: serverTimestamp()
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
};

