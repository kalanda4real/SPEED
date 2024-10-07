import Link from 'next/link';
import styles from '@/styles/homepage.module.css'

export default function ModeratorHome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Moderator Dashboard</h1>
      <h3 className={styles.description}>
        Analytics Page is under construction.
      </h3>

      <div className={styles.buttonContainer}>
        <Link href="/mod/" passHref>
          <button className={styles.button}> Back to home</button>
        </Link>
        
      </div>

      <footer className={styles.footer}>
        <p>© 2024 Software Practice Empirical Evidence Database. By Azel Pheobe Martin Simar.</p>
      </footer>
    </div>
  );
}
