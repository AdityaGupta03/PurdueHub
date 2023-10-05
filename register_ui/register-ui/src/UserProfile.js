import React, { useState } from 'react'
import './Profile.css' // css pulled online
import temp from './temporary-profile.jpeg' // temp picture

const UserProfile = () => {

    const[username, setUser] = useState('validUser123'); // username info
    const[profilePicture, setProfilePictrue] = useState(temp); // profile picture info
    const[bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas integer eget aliquet. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Nunc sed blandit libero volutpat sed cras. At augue eget arcu dictum varius duis at consectetur. Ut consequat semper viverra nam libero. Mi eget mauris pharetra et ultrices neque ornare aenean. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Pellentesque sit amet porttitor eget dolor morbi. Gravida in fermentum et sollicitudin ac orci phasellus. Et netus et malesuada fames ac turpis. Nec nam aliquam sem et tortor consequat. Sit amet nulla facilisi morbi tempus iaculis.'); // bio info s
    const[isEditing, setIsEditing] = useState(false); // edit status check
    const [selectedImage, setSelectedImage] = useState(null);

    let pf = useState(null);
    // Be able to set functions for buttons: save and edit
    // save = save information, no longer editing
    // edit = not saved yet, information will change

    const handleEditClick = () => {
        setIsEditing(true);
    }
    const handleSaveClick = () => {
        setIsEditing(false);

        // SAVE DATA TO BACKEND HERE!
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            setSelectedImage(e.target.result);
          };
    
          reader.readAsDataURL(file);
        }
        pf = selectedImage;
    };

    return (
        <>
        {isEditing ? (
            <section>
                <label htmlFor='username'> 
                    Username: 
                </label>
                <input
                    type="text"
                    placeholder={username}
                    id='username'
                    value={username}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                />
                <label htmlFor='profilePic'> 
                    Profile Picture: 
                </label>
                <input
                    type="file"
                    id='profilePic'
                    accept="image/*"
                    autoComplete='off'
                    onChange={handleImageChange}
                    style={{display: 'none'}}
                />
                <img 
                        className='landscape'
                        src={selectedImage || profilePicture}
                        alt="Profile"
                    />
                <label htmlFor='bio'>Bio:</label>
                <textarea
                    id='bio'
                    placeholder={bio}
                    value={bio}
                    rows={11}
                    cols={40}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button onClick={handleSaveClick}>Save</button>
            </section>
        ) : (
             <div>
                <h1>User Profile</h1>
                <img className='landscape' src={selectedImage || profilePicture} alt="Profile Picture"/>
                <h2>Username: {username}</h2>
                <p>Bio: {bio}</p>
                <button onClick={handleEditClick}>Edit Profile</button>
             </div>
        )}
    </>
    )
}




export default UserProfile