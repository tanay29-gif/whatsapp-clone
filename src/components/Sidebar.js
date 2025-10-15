import { useState, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { IoSearchOutline } from 'react-icons/io5';
import { MdGroups, MdLogout } from 'react-icons/md';
import { TbCircleDashed } from 'react-icons/tb';
import { collection, query, where, onSnapshot, orderBy, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, logOut } from '../firebase';
import './Sidebar.css';

function Sidebar({ user, selectedChat, onChatSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

   
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', user.uid),
      orderBy('lastMessageTime', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(chatList);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
  
    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const usersList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u => u.id !== user.uid);
      setAllUsers(usersList);
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const startNewChat = async (otherUser) => {
    try {
    
      const existingChat = chats.find(chat => 
        chat.participants.includes(otherUser.id)
      );

      if (existingChat) {
        onChatSelect(existingChat);
        setShowNewChatModal(false);
        return;
      }

      
      const chatData = {
        participants: [user.uid, otherUser.id],
        participantDetails: {
          [user.uid]: {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          },
          [otherUser.id]: {
            name: otherUser.name,
            email: otherUser.email,
            photoURL: otherUser.photoURL
          }
        },
        lastMessage: '',
        lastMessageTime: serverTimestamp(),
        createdAt: serverTimestamp()
      };

      const chatRef = await addDoc(collection(db, 'chats'), chatData);
      
      const newChat = {
        id: chatRef.id,
        ...chatData
      };

      onChatSelect(newChat);
      setShowNewChatModal(false);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const filteredChats = chats.filter(chat => {
    const otherUserId = chat.participants.find(id => id !== user.uid);
    const otherUserData = chat.participantDetails?.[otherUserId];
    return otherUserData?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getOtherUserData = (chat) => {
    const otherUserId = chat.participants.find(id => id !== user.uid);
    return chat.participantDetails?.[otherUserId] || {};
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="sidebar">
  
      <div className="sidebar-header">
        <div className="sidebar-avatar" title={user.displayName}>
          <img src={user.photoURL || 'https://i.pravatar.cc/150?img=68'} alt="User" />
        </div>
        <div className="sidebar-header-icons">
          <MdGroups className="icon" title="Communities" />
          <TbCircleDashed className="icon" title="Status" />
          <BiMessageSquareAdd 
            className="icon" 
            title="New chat"
            onClick={() => setShowNewChatModal(true)}
          />
          <BsThreeDotsVertical className="icon" title="Menu" />
          <MdLogout 
            className="icon logout-icon" 
            title="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>

     
      <div className="sidebar-search">
        <div className="search-container">
          <IoSearchOutline className="search-icon" />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      
      <div className="sidebar-chats">
        {filteredChats.length === 0 ? (
          <div className="no-chats">
            <p>No chats yet</p>
            <button onClick={() => setShowNewChatModal(true)}>Start a new chat</button>
          </div>
        ) : (
          filteredChats.map((chat) => {
            const otherUser = getOtherUserData(chat);
            return (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => onChatSelect(chat)}
              >
                <div className="chat-avatar">
                  <img src={otherUser.photoURL || 'https://i.pravatar.cc/150?img=12'} alt={otherUser.name} />
                </div>
                <div className="chat-info">
                  <div className="chat-header">
                    <h3 className="chat-name">{otherUser.name || 'Unknown User'}</h3>
                    <span className="chat-time">{formatTime(chat.lastMessageTime)}</span>
                  </div>
                  <div className="chat-message-preview">
                    <p className="last-message">{chat.lastMessage || 'No messages yet'}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

  
      {showNewChatModal && (
        <div className="modal-overlay" onClick={() => setShowNewChatModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Chat</h2>
              <button className="close-btn" onClick={() => setShowNewChatModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {allUsers.length === 0 ? (
                <p className="no-users">No other users found</p>
              ) : (
                allUsers.map(otherUser => (
                  <div
                    key={otherUser.id}
                    className="user-item"
                    onClick={() => startNewChat(otherUser)}
                  >
                    <div className="user-avatar">
                      <img src={otherUser.photoURL || 'https://i.pravatar.cc/150?img=20'} alt={otherUser.name} />
                    </div>
                    <div className="user-info">
                      <h4>{otherUser.name}</h4>
                      <p>{otherUser.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
