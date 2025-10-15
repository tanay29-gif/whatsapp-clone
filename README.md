# WhatsApp Clone - Full Stack

A fully functional WhatsApp Web clone built with React and Firebase. This project replicates the core UI and messaging functionality of WhatsApp Web with real-time messaging, user authentication, and cloud data persistence.

## Features

✨ **Core Features**
- 🔐 **Google Authentication** - Secure sign-in with Firebase Auth
- 💬 **Real-time Messaging** - Instant message delivery with Firestore
- 📱 **Beautiful WhatsApp-inspired UI** - Dark theme matching WhatsApp Web
- 👥 **User Management** - Create chats with any registered user
- 🔍 **Search functionality** - Filter through your conversations
- 😊 **Emoji picker** - Express yourself with emojis
- ⏰ **Message timestamps** - See when messages were sent
- 💾 **Cloud persistence** - All data stored in Firebase
- 📱 **Responsive design** - Works on desktop and mobile
- 🔒 **Secure** - Protected with Firestore security rules

## Screenshots

The app includes:
- **Sidebar**: Chat list with search, user avatars, and last messages
- **Chat Area**: Message display with sent/received messages
- **Input Area**: Message input with emoji picker and attachment options

## Tech Stack

### Frontend
- **React 18** - UI Framework
- **React Icons** - Icon library
- **CSS3** - Styling with WhatsApp's dark theme

### Backend (Firebase)
- **Firebase Authentication** - Google OAuth sign-in
- **Cloud Firestore** - Real-time NoSQL database
- **Firebase Storage** - File storage (ready for future use)
- **Firebase Hosting** - Deployment platform

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Firebase account (free tier works perfectly)

### Setup Steps

1. **Clone and Install**
   ```bash
   cd whatsapp-clone
   npm install
   ```

2. **Configure Firebase**
   
   Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to:
   - Create a Firebase project
   - Enable Google Authentication
   - Set up Firestore Database
   - Configure security rules
   - Get your Firebase config keys

3. **Set Environment Variables**
   
   Update the `.env` file with your Firebase credentials:
   ```bash
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```

5. **Open the App**
   
   Navigate to `http://localhost:3000` in your browser

## Usage

### First Time Setup
1. **Sign In**: Click "Sign in with Google" to authenticate
2. **Create Profile**: Your profile is automatically created from your Google account

### Using the App
1. **Start a New Chat**: 
   - Click the "+" icon in the sidebar
   - Select a user from the list
   - Start messaging!

2. **Send Messages**: 
   - Type your message in the input box
   - Press Enter or click the send icon
   - Messages appear instantly for both users

3. **Search Chats**: 
   - Use the search bar to filter your conversations
   - Find chats by contact name

4. **Add Emojis**: 
   - Click the emoji icon (😊)
   - Select from the emoji picker
   - Emojis are added to your message

5. **View Chat History**: 
   - All messages are saved in Firebase
   - Scroll through conversation history
   - Messages sync across all devices

6. **Logout**: 
   - Click the logout icon in the sidebar header

## Project Structure

```
whatsapp-clone/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Sidebar.js        # Chat list with search
│   │   ├── Sidebar.css
│   │   ├── ChatArea.js       # Message interface
│   │   ├── ChatArea.css
│   │   ├── Login.js          # Authentication screen
│   │   └── Login.css
│   ├── utils/
│   │   └── userUtils.js      # User management helpers
│   ├── firebase.js           # Firebase configuration
│   ├── App.js                # Main app component
│   ├── App.css
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables (DO NOT COMMIT)
├── .gitignore
├── package.json
├── README.md
└── FIREBASE_SETUP.md         # Detailed Firebase setup guide
```

## Features Explained

### Authentication
- **Google OAuth**: Secure sign-in using Firebase Authentication
- **Auto Profile Creation**: User profiles created automatically from Google account
- **Session Management**: Stay logged in across browser sessions
- **Secure Logout**: Safely sign out when done

### Real-Time Messaging
- **Instant Delivery**: Messages appear immediately using Firestore real-time listeners
- **Message Persistence**: All messages stored in cloud database
- **Timestamp Tracking**: See exactly when messages were sent
- **Read Status**: Track message read status (ready for future enhancement)

### User Interface

#### Sidebar
- View all your active conversations
- See contact avatars, names, and last messages
- Timestamps showing when last message was sent
- Search functionality to quickly find conversations
- "New Chat" button to start conversations with any user
- User profile with logout option

#### Chat Area
- Clean message display with sent/received styling
- Sent messages (green) on the right
- Received messages (gray) on the left
- Message timestamps
- Emoji picker for expressive messaging
- Smooth auto-scrolling to latest messages
- Empty state when no chat is selected

### Data Structure
- **Users Collection**: Stores user profiles
- **Chats Collection**: Stores conversation metadata
- **Messages Subcollection**: Stores all messages within each chat
- **Real-time Sync**: Changes reflected instantly across all devices

## Customization

### Colors
The app uses WhatsApp's official dark theme colors:
- Background: `#111b21`
- Chat Background: `#0b141a`
- Sidebar: `#202c33`
- Sent Messages: `#005c4b`
- Received Messages: `#202c33`
- Primary Green: `#00a884`

### Adding More Users
To chat with more people:
1. They need to sign in with their Google account
2. Their profile will be automatically created
3. You can find them in the "New Chat" modal
4. Start a conversation with any registered user

### Firebase Configuration
All Firebase settings are in `src/firebase.js`. Make sure your `.env` file has the correct credentials.

## Future Enhancements

Ready-to-implement features:
- 📷 **Image/Video Sharing**: Use Firebase Storage for media files
- 🎤 **Voice Messages**: Record and send audio messages
- 📞 **Voice/Video Calls**: Integrate WebRTC for calling
- 👥 **Group Chats**: Support for multiple participants
- ⚡ **Message Reactions**: React to messages with emojis
- 🔍 **Message Search**: Search within conversations
- ✏️ **Edit/Delete Messages**: Modify or remove sent messages
- 📱 **Status/Stories**: Share temporary status updates
- 🌙 **Light Theme**: Toggle between dark and light modes
- 🔔 **Push Notifications**: Get notified of new messages
- ✓✓ **Read Receipts**: Show when messages are read
- 💾 **Message Export**: Download chat history
- 🔐 **End-to-End Encryption**: Add client-side encryption

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Notes

- Never commit your `.env` file to version control
- Keep your Firebase API keys secure
- The Firestore security rules ensure users can only access their own chats
- All authentication is handled securely by Firebase

## Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - Select "Hosting"
   - Choose your Firebase project
   - Set build directory to `build`
   - Configure as single-page app: Yes

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

### Deploy to Other Platforms

This app can also be deployed to:
- Vercel
- Netlify
- Heroku
- AWS Amplify

Just make sure to set the environment variables in your hosting platform's dashboard.

## Troubleshooting

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed troubleshooting guides.

Common issues:
- **Authentication fails**: Check Firebase Auth is enabled
- **Messages don't send**: Verify Firestore rules and indexes
- **App won't load**: Check `.env` file has correct Firebase config

## License

This is an educational project for learning purposes.

## Contributing

Feel free to fork this project and add your own features!

---

**Note**: This is a fully functional full-stack application with Firebase backend. It includes real-time messaging, authentication, and cloud data persistence.
