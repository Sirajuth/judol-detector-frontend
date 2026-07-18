import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; 
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Menyimpan username ke localStorage agar sinkron dengan Navbar baru kamu
        localStorage.setItem('username', username);
        login(); 
        navigate('/');
        setTimeout(() => {
          setShowWelcome(true);
        }, 3000);
      } else {
        setErrorMessage(data.message || 'Login Gagal. Coba Lagi');
      }
    } catch (error) {
      setErrorMessage('Unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500&display=swap');

        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0;
          height: 100%;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(rgba(15, 23, 42, 0.45), rgba(30, 41, 59, 0.55)), url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c489e8ec-ea6a-4f75-84b3-f72a8a53f13a.png') no-repeat center center fixed;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .app {
          width: 100%;
          max-width: 440px;
          padding: 20px;
        }
        
        /* Glassmorphism Card Login Modern */
        .login-container {
          background-color: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3rem 2.5rem;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          color: #f8fafc;
          text-align: center;
        }
        
        .logo-container {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
        }
        .logo-container img {
          max-width: 180px;
          height: 38px;
          object-fit: contain;
        }

        /* Judul Bergaya Digital Elegan Rajdhani */
        .login-container h2 {
          font-family: 'Rajdhani', sans-serif;
          margin: 0 0 2rem 0;
          font-weight: 600;
          font-size: 1.5rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #ffffff;
          line-height: 1.3;
        }
        
        form {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        
        .input-wrapper {
          position: relative;
          width: 100%;
          margin-bottom: 1.25rem;
        }
        
        input[type="text"], input[type="password"] {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          height: 44px;
          padding: 0 45px 0 1rem;
          font-size: 0.875rem;
          color: #ffffff;
          outline: none;
          transition: all 0.2s ease;
          width: 100%;
          font-weight: 400;
        }
        
        input[type="text"]:focus, input[type="password"]:focus {
          border-color: rgba(99, 102, 241, 0.6);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
          background-color: rgba(255, 255, 255, 0.08);
        }
        
        input::placeholder {
          color: #64748b;
        }
        
        /* Tombol Toggle Mata Transparan */
        .toggle-password {
          position: absolute;
          top: 50%;
          right: 14px;
          transform: translateY(-50%);
          cursor: pointer;
          color: #64748b;
          background: none;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 24px;
          width: 24px;
          transition: color 0.2s;
        }
        .toggle-password:hover {
          color: #38bdf8;
        }
        
        /* Tombol Aksi Indigo SaaS */
        .btn-login {
          background-color: #4f46e5;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          padding: 0.75rem;
          cursor: pointer;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
          transition: background-color 0.2s ease;
          margin-top: 0.5rem;
        }
        .btn-login:hover {
          background-color: #4338ca;
        }
        
        /* Toast Popup Sukses Modern */
        .popup {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(16, 185, 129, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.85rem 1.75rem;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          z-index: 9999;
          font-size: 0.875rem;
          font-weight: 400;
        }
        .popup p {
          margin: 0;
        }

        .error-message {
          color: #f87171;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.15);
          font-size: 0.813rem;
          padding: 0.5rem;
          border-radius: 6px;
          margin-bottom: 1.25rem;
          user-select: none;
          text-align: left;
        }
        
        @media (max-width: 480px) {
          .app {
            max-width: 100%;
            padding: 1rem;
          }
          .login-container {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
      
      {showWelcome && (
        <div className="popup">
          <p>Selamat datang kembali, {username}!</p>
        </div>
      )}

      <div className="app" role="main">
        <div className="login-container" aria-label="Admin login panel">
          <div className="logo-container">
            <img
              src="./KOMINFO.png"
              alt="Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h2>Portal Otentikasi<br />Judol Detector</h2>

          <form onSubmit={handleLogin} aria-describedby="error-msg">
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                placeholder="Masukkan username"
                autoComplete="username"
                aria-required="true"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="Username input"
              />
            </div>

            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Masukkan password"
                autoComplete="current-password"
                aria-required="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.02 10.02 0 0 1 6.06 6.06" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {errorMessage && (
              <div id="error-msg" className="error-message" role="alert">
                ⚠️ {errorMessage}
              </div>
            )}

            <button type="submit" className="btn-login" aria-label="Login button">MASUK PANEL</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;