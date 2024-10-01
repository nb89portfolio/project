import { NavigationButton } from '@/src/navigation/button';
import styles from './page.module.css';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h2>Page not Found</h2>
      <p>The page that you are looking for cannot be found.</p>
      <section>
        <NavigationButton route='home'></NavigationButton>
        <NavigationButton route='back'></NavigationButton>
        <NavigationButton route='refresh'></NavigationButton>
      </section>
    </main>
  );
}
