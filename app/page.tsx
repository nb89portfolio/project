import styles from './page.module.css';

export default async function Home() {
  const title = 'Home Page';

  throw new Error();

  return (
    <main className={styles.main}>
      <p>This is the home page.</p>
    </main>
  );
}
