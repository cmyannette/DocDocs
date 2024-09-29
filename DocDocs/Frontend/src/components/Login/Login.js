// Login.js
import React, { useState } from 'react';
import './Login.css';
import '../../App.css';

function Login({ onLogin, setIsAdmin }) {
  const [isAdminChecked, setIsAdminChecked] = useState(false);

  const handleLogin = () => {
    onLogin();
    setIsAdmin(isAdminChecked);
  };

  return (
    <div className="Login">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="glass-form" onSubmit={(e) => e.preventDefault()}>
        <h3>Welcome to DocDocs! Please Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <div>
          <input 
            type="checkbox" 
            id="admin" 
            checked={isAdminChecked}
            onChange={() => setIsAdminChecked(!isAdminChecked)} 
          />
          <label htmlFor="admin">Admin</label>
        </div>

        <button type="button" onClick={handleLogin}>Log In</button>
      </form>
    </div>
  );
}

export default Login;