import React, { useState } from 'react';
import styles from '@/styles/signup.module.css';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For error handling

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      
      const response = await fetch('http://localhost:8082/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      

      if (!response.ok) {

        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        return;
      }

    
      const data = await response.json();
      console.log('Login Success:', data);

     
      localStorage.setItem('token', data.token); 
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
        <Link href="/signup" passHref>
          <button>Click to go to the SignUp page</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;

