# Quick Start Guide

## For Users with Dummy Firebase Keys

If you just want to see the UI and test the app locally, follow these steps:

### 1. Start the App
```bash
cd whatsapp-clone
npm start
```

The app will start at `http://localhost:3000`

### 2. What You'll See

With the dummy Firebase keys, you'll see:
- ✅ Beautiful WhatsApp UI
- ✅ Login screen
- ❌ Authentication won't work (needs real Firebase keys)
- ❌ Messaging won't work (needs real Firebase keys)

### 3. To Make It Fully Functional

You need to replace the dummy keys with your own Firebase configuration:

**Quick Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Google Authentication
4. Create a Firestore Database
5. Get your config keys
6. Replace the values in `.env` file

**Detailed Steps:**
See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete instructions.

---

## Current Configuration Status

Your `.env` file currently has **DUMMY KEYS**:
```
REACT_APP_FIREBASE_API_KEY=AIzaSyDummyApiKey123456789abcdefghijklmno
REACT_APP_FIREBASE_AUTH_DOMAIN=whatsapp-clone-dummy.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=whatsapp-clone-dummy
...
```

These need to be replaced with your actual Firebase project credentials.

---

## Expected Behavior

### With Dummy Keys:
- App loads with login screen
- "Sign in with Google" button appears
- Clicking sign-in will show an error
- Console will show Firebase initialization warnings

### With Real Firebase Keys:
- Google sign-in works ✓
- User profile created automatically ✓
- Real-time messaging works ✓
- Data persists in cloud ✓
- Multi-device sync works ✓

---

## Getting Help

1. **Setup Issues**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
2. **General Info**: See [README.md](./README.md)
3. **Firebase Errors**: Check Firebase Console for detailed logs

---

## Next Steps

Once you have Firebase set up:
1. Sign in with your Google account
2. Open the app in another browser (or incognito)
3. Sign in with a different Google account
4. Start a chat between the two accounts
5. Watch messages sync in real-time! 🎉

