import styles from '../../app/page.module.css';
import BackButton from '../navigation/buttons/back';
import HomeButton from '../navigation/buttons/home';
import RefreshButton from '../navigation/buttons/refresh';

export default function LoadingFallback() {
  return (
    <main className={styles.main}>
      <h2>Page Loading</h2>
      <p>The page you are looking for is currently loading. Please wait.</p>
      <section>
        <RefreshButton></RefreshButton>
        <BackButton></BackButton>
        <HomeButton></HomeButton>
      </section>
    </main>
  );
}
