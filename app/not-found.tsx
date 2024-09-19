import styles from './page.module.css';
import BackButton from '@/src/navigation/buttons/back';
import HomeButton from '@/src/navigation/buttons/home';
import RefreshButton from '@/src/navigation/buttons/refresh';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h2>Page not Found</h2>
      <p>The page that you are looking for cannot be found.</p>
      <section>
        <RefreshButton></RefreshButton>
        <BackButton></BackButton>
        <HomeButton></HomeButton>
      </section>
    </main>
  );
}
