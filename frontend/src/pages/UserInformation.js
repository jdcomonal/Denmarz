import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInformation.css';

const UserInformation = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [USER, setUSER] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem('login_id')
  useEffect(() => {
    if (!localStorage.getItem('login_id')) {
      // alert('invalid address')
      navigate('/home')
    }
  }, [])

  async function fetchUser() {
    // const id = localStorage.getItem('login_id')

    try {
      const response = await fetch('http://localhost:5000/api/userInfo/' + id);
      console.log("🚀 ~ file: UserInformation.js:27 ~ fetchUser ~ response:", response)
      console.log("🚀 ~ file: UserInformation.js:27 ~ fetchUser ~ id:", id)
      const user = await response.json();
      setUSER(user);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }

  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (USER) {
      setUsername(USER.username);
      setPassword(USER.password);
      setFirstName(USER.FirstName);
      setLastName(USER.LastName);
      setAddress(USER.address);
      setContact(USER.contact);
    }
  }, [USER]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const updatedUser = {
      username,
      password,
      firstName,
      lastName,
      address,
      contact,
    };

    try {
      const response = await fetch('http://localhost:5000/api/updateUser/'+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.status === 200) {
        console.log('User information updated successfully');
        alert('User information updated successfully')
        // You might want to show a success message here or redirect the user
      } else {
        console.error('Error updating user information');
        alert('Error updating user information')
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <main>
      <div className="user-information-container">
        <h2>User Information</h2>
        <div className='div__info-flex'>
          <form onSubmit={handleSubmit} className="user-form">
            <div className='div__login-info'>
              <fieldset>
                <legend>Login Information</legend>
                <label className="form-label">
                  Username:
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input" required/>
                </label>
                <label className="form-label">
                  Password:
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input"  required/>
                </label>
              </fieldset>
            </div>
            <div className='div_personal-info'>
              <fieldset>
                <legend>Personal Information</legend>
                <label className="form-label">
                  First Name:
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter First Name' required className="form-input" />
                </label>
                <label className="form-label">
                  Last Name:
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Enter Last Name' required className="form-input" />
                </label>
                <label className="form-label">
                  Address:
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter address' className="form-input" required />
                </label>
                <label className="form-label">
                  Contact:
                  <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder='Enter Mobile Number' className="form-input" required />
                </label>
              </fieldset>
              <button type="submit" className="link__button">Update Information</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UserInformation;
