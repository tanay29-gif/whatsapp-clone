import { useState, useRef, useEffect } from 'react';
import { BsThreeDotsVertical, BsEmojiSmile } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlinePaperClip } from 'react-icons/hi2';
import { MdSend } from 'react-icons/md';
import { BsMicFill } from 'react-icons/bs';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './ChatArea.css';

function ChatArea({ user, selectedChat }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  
  const emojis = ['😀', '😂', '❤️', '😍', '🎉', '👍', '🙏', '💯', '🔥', '✨', '🎊', '🎈', '🌟', '💪', '👏', '🤝'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!selectedChat) {
      setMessages([]);
      return;
    }

    
    const messagesRef = collection(db, 'chats', selectedChat.id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, [selectedChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedChat) return;

    try {
      const messageData = {
        text: message,
        senderId: user.uid,
        senderName: user.displayName,
        senderPhoto: user.photoURL,
        timestamp: serverTimestamp(),
        read: false
      };

     
      await addDoc(collection(db, 'chats', selectedChat.id, 'messages'), messageData);

     
      const chatRef = doc(db, 'chats', selectedChat.id);
      await updateDoc(chatRef, {
        lastMessage: message,
        lastMessageTime: serverTimestamp(),
        lastMessageSender: user.uid
      });

      setMessage('');
      setShowEmojiPicker(false);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please check your Firebase configuration.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getOtherUserData = () => {
    if (!selectedChat) return {};
    const otherUserId = selectedChat.participants.find(id => id !== user.uid);
    return selectedChat.participantDetails?.[otherUserId] || {};
  };

  if (!selectedChat) {
    return (
      <div className="chat-area no-chat">
        <div className="no-chat-content">
          <div className="whatsapp-logo">
            <svg viewBox="0 0 303 303" width="300" height="300">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#25D366', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#128C7E', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <path fill="url(#gradient)" d="M149.996 0C67.157 0 .001 67.161.001 149.997c0 26.554 6.947 51.502 19.081 73.132L.241 302.891l82.693-21.701c20.857 11.425 44.676 17.953 69.956 17.953 82.837 0 150-67.161 150-149.997S232.833 0 149.996 0zm87.207 213.122c-3.595 10.128-17.849 18.536-29.161 21.012-7.78 1.699-17.918 3.072-52.096-11.208-43.243-18.125-71.194-62.037-73.353-64.896-2.147-2.853-17.508-23.297-17.508-44.433 0-21.137 11.085-31.525 15.014-35.827 3.929-4.301 8.576-5.375 11.441-5.375 2.853 0 5.714.013 8.199.153 2.627.141 6.145-.999 9.604 7.324 3.595 8.576 12.293 29.995 13.373 32.161 1.085 2.154 1.81 4.664.37 7.523-1.441 2.847-2.154 4.621-4.302 7.093-2.16 2.471-4.539 5.521-6.486 7.416-2.148 2.091-4.383 4.347-1.881 8.521 2.501 4.175 11.118 18.332 23.872 29.705 16.399 14.622 30.243 19.165 34.544 21.319 4.302 2.154 6.807 1.798 9.308-.999 2.501-2.798 10.741-12.536 13.601-16.837 2.859-4.302 5.714-3.595 9.645-2.154 3.929 1.428 24.994 11.794 29.295 13.936 4.302 2.154 7.161 3.221 8.199 5.01 1.085 1.798 1.085 10.38-2.51 20.508z"/>
            </svg>
          </div>
          <h2>WhatsApp Web</h2>
          <p>Send and receive messages without keeping your phone online.</p>
          <p>Start a conversation by selecting a chat or creating a new one.</p>
          <p className="encrypted">🔒 End-to-end encrypted</p>
        </div>
      </div>
    );
  }

  const otherUser = getOtherUserData();

  return (
    <div className="chat-area">
     
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">
            <img src={otherUser.photoURL || 'https://i.pravatar.cc/150?img=12'} alt={otherUser.name} />
          </div>
          <div className="chat-details">
            <h3>{otherUser.name || 'Unknown User'}</h3>
            <span className="online-status">online</span>
          </div>
        </div>
        <div className="chat-header-actions">
          <IoSearchOutline className="icon" title="Search" />
          <BsThreeDotsVertical className="icon" title="Menu" />
        </div>
      </div>

    
      <div className="messages-area">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.senderId === user.uid ? 'sent' : 'received'}`}>
              <div className="message-content">
                <p className="message-text">{msg.text}</p>
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

    
      <div className="input-area">
        <div className="input-actions-left">
          <BsEmojiSmile 
            className="icon" 
            title="Emoji" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          <HiOutlinePaperClip className="icon" title="Attach" />
        </div>
        
        {showEmojiPicker && (
          <div className="emoji-picker">
            {emojis.map((emoji, index) => (
              <span 
                key={index} 
                className="emoji" 
                onClick={() => addEmoji(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}

        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </form>
        
        <div className="input-actions-right">
          {message.trim() ? (
            <MdSend 
              className="icon send-icon" 
              title="Send" 
              onClick={handleSendMessage}
            />
          ) : (
            <BsMicFill className="icon" title="Voice message" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
