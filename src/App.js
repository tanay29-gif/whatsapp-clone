import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { saveUserToFirestore } from './utils/userUtils';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Login from './components/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await saveUserToFirestore(currentUser);
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app">
      <Sidebar 
        user={user}
        selectedChat={selectedChat} 
        onChatSelect={handleChatSelect}
      />
      <ChatArea 
        user={user}
        selectedChat={selectedChat}
      />
    </div>
  );
}

export default App;
