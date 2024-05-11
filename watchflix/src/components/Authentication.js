
import React, { useState } from 'react';
import email_icon from '../images/email.png';
import password_icon from '../images/password.png';
import user_icon from '../images/person.png';
import './Authe.css';

function Authentication({ onClose }) {
  const [action, setAction] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // Here you can access the values of name, email, and password and perform actions like sending them to a server or storing them locally.

    const formData = {
      name,
      email,
      password,
    }

fetch ("http://localhost:3000/users", { 
  method: 'POST', headers: {
    "Content-Type": "application/json",
  },
  body:JSON.stringify(formData)

})
.then((res)=>res.json())
.then((data)=>{
  setName('');
setEmail('');
setPassword('');
})



    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

  
  };

  return (
    <div className="auth-container">
      <div className="overlay" onClick={onClose}></div>
      <div className="auth-box">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="inputs">
          {action === 'Sign Up' ? (
            <div className="input">
              <img src={user_icon} alt="" />
              <input type="text" placeholder="Name" value={name} onChange={(e) => handleInputChange(e, 'name')} />
            </div>
          ) : null}

          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email Id" value={email} onChange={(e) => handleInputChange(e, 'email')} />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => handleInputChange(e, 'password')} />
          </div>
        </div>
        {action === 'Login' ? (
          <div className="forgot-password">
            Forgot Password? <span>Click Here!</span>
          </div>
        ) : null}

        <div className="submit-container">
          <div
            className={action === 'Sign Up' ? 'submit gray' : 'submit'}
            onClick={() => {
              handleSubmit();
              setAction('Login');
            }}
          >
            Login
          </div>
          <div
            className={action === 'Login' ? 'submit gray' : 'submit'}
            onClick={() => {
              handleSubmit();
              setAction('Sign Up');
            }}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
