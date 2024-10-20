import styles from "@/styles/homepage.module.css";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* PopulatedNavBar is imported but not rendered */}
      <h1 className={styles.title}>Analyst Dashboard</h1>
      <h3 className={styles.description}>
        Welcome to the Analyst Dashboard. Here you can manage and review
        articles.
      </h3>
      <div className={styles.buttonContainer}>
        <Link href="/analyst/new-articles" passHref>
          <button className={styles.button}>New Articles</button>
        </Link>
        <Link href="/analyst/past-reviewed-articles" passHref>
          <button className={styles.button}>Past Reviewed Articles</button>
        </Link>
      </div>
      <div className={styles.counterBox}>
        <h4></h4>
      </div>
      <footer className={styles.footer}>
        <p>
          © 2024 Software Practice Empirical Evidence Database. By Azel, Phoebe,
          Martin, Simar.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
