import NavigationButton from "./navigationButton";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h2>Page Not Found</h2>
      <p>The page you are looking for is currently unavailable.</p>
      <NavigationButton path={"/"}></NavigationButton>
    </main>
  );
}
