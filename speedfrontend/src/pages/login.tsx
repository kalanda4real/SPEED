/*import React, { useState } from 'react';
import styles from '@/styles/signup.module.css';
import { useEffect } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Login Data:', { email, password });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8082/api/users/login'); // Backend endpoint
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;*/

import React, { useState } from 'react';
import styles from '@/styles/signup.module.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For error handling

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Make a POST request to the backend with login details
      const response = await fetch('http://localhost:8082/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // sending the email and password
      });
      

      if (!response.ok) {
        // Handle response errors
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        return;
      }

      // Successful login, get response data (e.g., JWT)
      const data = await response.json();
      console.log('Login Success:', data);

      // Save the JWT or token in local storage or cookies
      localStorage.setItem('token', data.token); // assuming the backend sends a token

      // Optionally, redirect to a different page after successful login
      // window.location.href = '/dashboard';

    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Display error messages */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;

