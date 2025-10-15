# Firebase Setup Guide for WhatsApp Clone

This guide will help you set up Firebase for your WhatsApp clone application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or "Create a project"
3. Enter your project name (e.g., "WhatsApp Clone")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create Project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (</>)
2. Register your app with a nickname (e.g., "WhatsApp Web")
3. Click "Register app"
4. Copy the Firebase configuration object (you'll need this for Step 4)

## Step 3: Enable Authentication

1. In the Firebase Console, go to **Build** > **Authentication**
2. Click "Get Started"
3. Go to the **Sign-in method** tab
4. Enable **Google** sign-in provider:
   - Click on "Google"
   - Toggle "Enable"
   - Select a support email
   - Click "Save"

## Step 4: Set Up Firestore Database

1. In the Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (we'll set up rules next)
4. Select a Cloud Firestore location closest to your users
5. Click "Enable"

### Configure Firestore Security Rules

Replace the default rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read all, but only write their own
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Chats collection - only participants can read/write
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
                          request.auth.uid in resource.data.participants;
      allow create: if request.auth != null;
      
      // Messages subcollection
      match /messages/{messageId} {
        allow read: if request.auth != null && 
                    request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
        allow create: if request.auth != null && 
                      request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
      }
    }
  }
}
```

## Step 5: Set Up Storage (Optional - for future file uploads)

1. In the Firebase Console, go to **Build** > **Storage**
2. Click "Get Started"
3. Accept the default security rules
4. Choose a location
5. Click "Done"

## Step 6: Configure Your Application

1. Open the `.env` file in your project root
2. Replace the dummy values with your actual Firebase configuration:

```bash
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Where to Find These Values:

1. Go to your Firebase project
2. Click the **gear icon** ⚙️ next to "Project Overview"
3. Select "Project settings"
4. Scroll down to "Your apps" section
5. Find your web app and click on "Config"
6. Copy each value to your `.env` file

## Step 7: Create Required Indexes (Important!)

Firestore needs composite indexes for some queries. You'll need to create these:

### Method 1: Create via Console

1. Go to **Firestore Database** > **Indexes** tab
2. Click "Create Index"
3. Create the following index:
   - **Collection ID**: `chats`
   - **Fields**:
     - `participants` (Array-contains)
     - `lastMessageTime` (Descending)
   - **Query scope**: Collection
4. Click "Create"

### Method 2: Let Firebase Create Automatically

When you first try to load chats, Firebase will show an error with a link to create the required index. Click that link and it will auto-create the index for you.

## Step 8: Test Your Setup

1. Make sure your `.env` file has the correct values
2. Restart your development server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000`
4. Click "Sign in with Google"
5. You should be able to sign in and see the app

## Firestore Database Structure

Your Firestore database will have the following structure:

```
users (collection)
  └── {userId} (document)
      ├── name: string
      ├── email: string
      ├── photoURL: string
      ├── createdAt: timestamp
      └── lastSeen: timestamp

chats (collection)
  └── {chatId} (document)
      ├── participants: array[userId1, userId2]
      ├── participantDetails: map
      │   ├── {userId1}: { name, email, photoURL }
      │   └── {userId2}: { name, email, photoURL }
      ├── lastMessage: string
      ├── lastMessageTime: timestamp
      ├── lastMessageSender: string
      └── createdAt: timestamp
      
      messages (subcollection)
        └── {messageId} (document)
            ├── text: string
            ├── senderId: string
            ├── senderName: string
            ├── senderPhoto: string
            ├── timestamp: timestamp
            └── read: boolean
```

## Troubleshooting

### "Missing or insufficient permissions" error
- Check your Firestore Security Rules
- Make sure you're signed in
- Verify the rules match the structure above

### "Failed to get document because the client is offline"
- Check your internet connection
- Verify Firebase configuration in `.env`

### Index creation errors
- Go to the Firestore Indexes tab
- Create the composite index for `chats` collection as described in Step 7

### Authentication not working
- Verify Google sign-in is enabled in Firebase Console
- Check that your API key is correct in `.env`
- Make sure you've added your domain to authorized domains (Firebase Console > Authentication > Settings > Authorized domains)

## Environment Variables

Never commit your `.env` file to version control! The `.gitignore` file already includes it.

If you're deploying to production, make sure to set these environment variables in your hosting platform.

## Next Steps

Once Firebase is set up, you can:
- Start messaging with other authenticated users
- Messages sync in real-time across devices
- User data is persisted in Firestore
- Authentication is handled securely by Firebase

## Support

For more information, visit:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

