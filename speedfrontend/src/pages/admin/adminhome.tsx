import styles from '@/styles/admin.module.css'
import Link from 'next/link';

export default function AdminHome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <h3 className={styles.description}>
        Welcome to the Admin Dashboard. Here you can manage the Database.
      </h3>

      <div className={styles.buttonContainer}>
        <Link href="/manage-articles" passHref>
          <button className={styles.button}>Manage Articles</button>
        </Link>
        <Link href="/view-analytics" passHref>
          <button className={styles.button}>View Analytics</button>
        </Link>
        <Link href="/user-management" passHref>
          <button className={styles.button}>User Management</button>
        </Link>
      </div>

      <div className={styles.counterBox}>
        <h4>Article count: <span id="counterValue">0</span></h4>
        <h4>   User count: <span id="counterValue">0</span></h4>
      </div>
      

      <footer className={styles.footer}>
        <p>© 2024 Software Practice Empirical Evidence Database. By Azel Pheobe Martin Simar.</p>
        <a href="/Home">About Us</a>
      </footer>
    </div>
  );
}

