import styles from '@/styles/homepage.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Software Practice Empirical Evidence Database (SPEED)</h1>
      <h3 className={styles.description}>
        SPEED is an article database for exploring empirical evidence in software engineering. It compiles studies 
        and insights to support informed decision-making and improve development practices. Whether youre seeking 
        best practices or evaluations of methodologies, SPEED offers valuable resources for advancing software 
        engineering through evidence-based research.
      </h3>

      <footer className={styles.footer}>
        <p>© 2024 Software Practice Empirical Evidence Database. By Azel Pheobe Martin Simar.</p>
        <a href="/Home">About Us</a>
      </footer>
    </div>
  );
}

