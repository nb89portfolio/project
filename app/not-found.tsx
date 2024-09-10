import UseNavigationButton from '@/src/navigate/provider';
import styles from './page.module.css'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h2>Page not Found</h2>
      <p>The page that you are looking for cannot be found.</p>
      <UseNavigationButton route={'back'}></UseNavigationButton>
      <UseNavigationButton route={'home'}></UseNavigationButton>
    </main>
  );
}
