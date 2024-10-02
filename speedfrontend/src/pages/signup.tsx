import React, { useState } from 'react';
import styles from '@/styles/signup.module.css';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8082/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Signup failed');
        return;
      }

      const data = await response.json();
      console.log('Signup Success:', data);
      setSuccessMessage('Signup successful! You can now log in.');
      setErrorMessage(''); // Clear error message if successful

    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </div>

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

        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

