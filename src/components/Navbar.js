import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <>
      {/* Menyuntikkan CSS hover interaktif & dropdown modern */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

        .navbar-custom {
          background-color: #0f172a !important; /* Warna gelap siber yang elegan */
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.65rem 1.5rem !important;
          font-family: 'Inter', sans-serif;
        }
        
        .nav-link-custom {
          color: #94a3b8 !important; /* Rata-rata warna teks menu tidak mencolok */
          font-weight: 400 !important; /* Dibuat biasa/tidak bold sesuai ketentuan */
          font-size: 0.925rem !important;
          padding: 0.5rem 0.75rem !important;
          transition: color 0.2s ease;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
        }

        .nav-link-custom:hover {
          color: #ffffff !important; /* Menyala putih bersih saat hover */
        }

        /* Gaya dropdown transparan modern */
        .dropdown-menu-custom {
          background: rgba(30, 41, 59, 0.95) !important;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3) !important;
          padding: 0.5rem 0 !important;
          margin-top: 0.5rem !important;
        }

        .dropdown-item-custom-text {
          color: #cbd5e1 !important;
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          display: block;
        }

        .dropdown-item-custom-btn {
          color: #f87171 !important; /* Tombol logout merah lembut */
          font-size: 0.875rem;
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          padding: 0.5rem 1rem;
          transition: background 0.2s;
        }

        .dropdown-item-custom-btn:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .dropdown-divider-custom {
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          margin: 0.4rem 0 !important;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
        <div className="container-fluid">
          {/* Bagian Logo */}
          <div style={styles.logoSection}>
            <img
              src="./KOMINFO.png"
              alt="Logo"
              style={styles.logo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Tombol Toggler Responsive */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu Navigasi */}
          <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center" style={{ gap: '0.5rem' }}>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/">Beranda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/stats">Statistik</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/transfer">Transfer ke Sheets</Link>
              </li>

              {/* USER ICON + DROPDOWN */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link nav-link-custom dropdown-toggle"
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                  style={{ gap: '0.25rem' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    role="img"
                    aria-hidden="true"
                    style={{ color: '#94a3b8' }}
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-custom show" style={{ position: 'absolute', right: 0 }}>
                    <li><span className="dropdown-item-custom-text">👤 {username}</span></li>
                    <li><hr className="dropdown-divider-custom" /></li>
                    <li><button className="dropdown-item-custom-btn" onClick={handleLogout}>Logout</button></li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

const styles = {
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    userSelect: 'none',
  },
  logo: {
    width: '200px',
    height: '38px',
    objectFit: 'contain',
  },
};

export default Navbar;