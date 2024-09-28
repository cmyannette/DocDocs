import React from 'react';
import './Login.css';
import '../../App.css';

function Login({ onLogin }) {
  return (
    <div className="Login">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="glass-form">
        <h3>Welcome to DocDocs! Please Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button type="button" onClick={onLogin}>Log In</button>
      </form>
    </div>
  );
}

export default Login;