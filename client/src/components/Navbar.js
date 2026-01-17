// Navbar Component - Navigation header
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            🚗 CarRental
          </Link>

          {/* Navigation Links */}
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="nav-link">
                  My Bookings
                </Link>

                {user?.role === 'admin' && (
                  <>
                    <Link to="/admin" className="nav-link">
                      Admin Dashboard
                    </Link>
                    <Link to="/admin/cars" className="nav-link">
                      Manage Cars
                    </Link>
                    <Link to="/admin/bookings" className="nav-link">
                      All Bookings
                    </Link>
                  </>
                )}

                <div className="nav-user">
                  <span className="user-name">{user?.firstName} {user?.lastName}</span>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="nav-link logout-btn">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link btn-primary">
                  Login
                </Link>
                <Link to="/register" className="nav-link btn-secondary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
