import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: localStorage.getItem('userName'),
    email: localStorage.getItem('userEmail')
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user details in local storage
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);
    console.log('Profile updated:', formData);
    navigate('/profile');
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;