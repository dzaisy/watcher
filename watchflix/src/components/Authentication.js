import React, { useState } from 'react';
import email_icon from '../images/email.png';
import password_icon from '../images/password.png';
import user_icon from '../images/person.png';
import './Authe.css';

function Authentication({ onClose }) {
  const [action, setAction] = useState('Login');

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
              <input type="text" placeholder="Name" />
            </div>
          ) : null}

          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" />
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
              setAction('Login');
            }}
          >
            Login
          </div>
          <div
            className={action === 'Login' ? 'submit gray' : 'submit'}
            onClick={() => {
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
