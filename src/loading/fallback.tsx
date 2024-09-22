import styles from '../../app/page.module.css';
import NavigationButton from '../navigation/navigation';

export default function LoadingFallback() {
  return (
    <main className={styles.main}>
      <h2>Page Loading</h2>
      <p>The page you are looking for is currently loading. Please wait.</p>
      <section>
        <NavigationButton route='back'></NavigationButton>
        <NavigationButton route='home'></NavigationButton>
        <NavigationButton route='refresh'></NavigationButton>
      </section>
    </main>
  );
}
