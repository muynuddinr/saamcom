import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    oldPassword: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser({ ...user, name: formData.name, email: formData.email });
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);
    setIsEditing(false);
  };

  const handleResetPassword = () => {
    setIsResettingPassword(true);
  };

  const handleSavePassword = () => {
    const storedPassword = localStorage.getItem('userPassword');
    if (formData.oldPassword === storedPassword) {
      localStorage.setItem('userPassword', formData.newPassword);
      setIsResettingPassword(false);
      alert('Password has been reset successfully.');
    } else {
      alert('Old password is incorrect.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Page</h2>
        {user ? (
          <div>
            {isEditing ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
                >
                  Save
                </button>
              </>
            ) : isResettingPassword ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={handleSavePassword}
                  className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
                >
                  Save Password
                </button>
              </>
            ) : (
              <>
                <p className="text-center mb-4"><strong>Name:</strong> {user.name}</p>
                <p className="text-center mb-4"><strong>Email:</strong> {user.email}</p>
                <button
                  onClick={handleEdit}
                  className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200 mb-4"
                >
                  Edit Details
                </button>
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Reset Password
                </button>
              </>
            )}
          </div>
        ) : (
          <p className="text-center">No user details available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;