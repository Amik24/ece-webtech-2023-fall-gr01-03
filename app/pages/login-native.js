import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');// We use usestate method to set a username and a password
  const [password, setPassword] = useState('');
  const [showValues, setShowValues] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nouveau = new FormData();//We use the FormData object
    nouveau.append('username', username);
    nouveau.append('password', password);
    for (let [key, value] of nouveau.entries()) {
      console.log(`${key}: ${value}`);
    }

    setShowValues(true);// We set the print of username and password to 5 seconds
    setTimeout(() => {
      setShowValues(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ textAlign: 'center' }}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div style={{ textAlign: 'center' }}><button type="submit" >Login</button></div>
      {showValues && (
        <div style={{ textAlign: 'center' }}>
          <p>Username: {username}</p>
          <p>Password: {password}</p>
        </div>
      )}
    </form>
  );
}

export default LoginForm;