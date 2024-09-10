import UseNavigationButton from '../navigate/provider';
import styles from '../../app/page.module.css';

export default function LoadingFallback() {
  return (
    <main className={styles.main}>
      <h2>Page Loading</h2>
      <p>The page you are looking for is currently loading. Please wait.</p>
      <UseNavigationButton route='refresh'></UseNavigationButton>
      <UseNavigationButton route='back'></UseNavigationButton>
      <UseNavigationButton route='home'></UseNavigationButton>
    </main>
  );
}
