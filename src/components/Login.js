import React from 'react';
import { signInWithGoogle } from '../firebase';
import './Login.css';

function Login() {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to sign in. Please check your Firebase configuration.');
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="whatsapp-logo-large">
          <svg viewBox="0 0 303 303" width="200" height="200">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#25D366', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#128C7E', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <path fill="url(#gradient)" d="M149.996 0C67.157 0 .001 67.161.001 149.997c0 26.554 6.947 51.502 19.081 73.132L.241 302.891l82.693-21.701c20.857 11.425 44.676 17.953 69.956 17.953 82.837 0 150-67.161 150-149.997S232.833 0 149.996 0zm87.207 213.122c-3.595 10.128-17.849 18.536-29.161 21.012-7.78 1.699-17.918 3.072-52.096-11.208-43.243-18.125-71.194-62.037-73.353-64.896-2.147-2.853-17.508-23.297-17.508-44.433 0-21.137 11.085-31.525 15.014-35.827 3.929-4.301 8.576-5.375 11.441-5.375 2.853 0 5.714.013 8.199.153 2.627.141 6.145-.999 9.604 7.324 3.595 8.576 12.293 29.995 13.373 32.161 1.085 2.154 1.81 4.664.37 7.523-1.441 2.847-2.154 4.621-4.302 7.093-2.16 2.471-4.539 5.521-6.486 7.416-2.148 2.091-4.383 4.347-1.881 8.521 2.501 4.175 11.118 18.332 23.872 29.705 16.399 14.622 30.243 19.165 34.544 21.319 4.302 2.154 6.807 1.798 9.308-.999 2.501-2.798 10.741-12.536 13.601-16.837 2.859-4.302 5.714-3.595 9.645-2.154 3.929 1.428 24.994 11.794 29.295 13.936 4.302 2.154 7.161 3.221 8.199 5.01 1.085 1.798 1.085 10.38-2.51 20.508z"/>
          </svg>
        </div>
        
        <h1>WhatsApp Clone</h1>
        <p className="login-subtitle">Connect with friends and family</p>
        
        <button className="google-signin-btn" onClick={handleSignIn}>
          <svg className="google-icon" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>
        
        <p className="login-footer">
          🔒 End-to-end encrypted messaging
        </p>
      </div>
    </div>
  );
}

export default Login;

