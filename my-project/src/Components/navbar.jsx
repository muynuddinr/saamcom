import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    } else {
      const name = localStorage.getItem('userName');
      if (name) {
        setUserName(name);
      }
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    setUser(null);
    setUserName('');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white text-lg font-bold flex items-center">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Food Tracker
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {userName}</span>
              <Link to="/profile" className="text-white hover:text-gray-200 transition duration-200">
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <button onClick={handleLogout} className="text-white hover:text-gray-200 transition duration-200">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-gray-200 transition duration-200">
                <FontAwesomeIcon icon={faUserPlus} />
              </Link>
              <Link to="/login" className="text-white hover:text-gray-200 transition duration-200">
                <FontAwesomeIcon icon={faSignInAlt} />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;