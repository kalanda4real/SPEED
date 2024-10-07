import Link from 'next/link';
import styles from '@/styles/homepage.module.css'

export default function ModeratorHome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Moderator Dashboard</h1>
      <h3 className={styles.description}>
        Welcome to the Moderator Dashboard. Here you can review and manage articles.
      </h3>

      <div className={styles.buttonContainer}>
        <Link href="/mod/modpending" passHref>
          <button className={styles.button}>Pending Articles</button>
        </Link>
        <Link href="/mod/modapproved" passHref>
          <button className={styles.button}>Approved Articles</button>
        </Link>
        <Link href="/mod/modrejected" passHref>
          <button className={styles.button}>Rejected Articles</button>
        </Link>
        <Link href="/mod/analytics" passHref>
          <button className={styles.button}>Analytics</button>
        </Link>
      </div>

      <footer className={styles.footer}>
        <p>© 2024 Software Practice Empirical Evidence Database. By Azel Pheobe Martin Simar.</p>
      </footer>
    </div>
  );
}
