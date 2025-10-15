import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const auth = admin.auth();
console.log("✅ Admin Auth initialized:", auth);