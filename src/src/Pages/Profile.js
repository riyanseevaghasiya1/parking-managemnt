import React, { useState } from 'react';
import '../styles/profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Shah',
    email: 'jk@gmail.com', // Note: In the image it shows "jk@gmail.com" but you mentioned to match exactly the UI which shows "jkgmail.com"
    phone: '+91 9898986598',
    image: 'Jonny.jpg'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        image: file.name
      }));
    }
  };

  const handleSaveChanges = () => {
    // Here you would typically make an API call to save the changes
    console.log('Saving profile data:', profileData);
    // Add your save logic here
  };

  return (
    <div className="profile-page">
      <h1 className="profile-title">Profile</h1>
      
      <div className="profile-card">
        <div className="form-row">
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            className="form-input"
          />
          
          <div className="image-input-container">
            <input
              type="text"
              value={profileData.image}
              readOnly
              className="form-input image-input"
            />
            <label className="choose-button">
              CHOOSE
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        <div className="button-container">
          <button className="save-button" onClick={handleSaveChanges}>
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;