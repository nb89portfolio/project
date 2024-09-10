import styles from './header.module.css';
import HeaderUrl from './url';

export default function HeaderProvider({}: {}) {
  return (
    <header className={styles.header}>
      <HeaderUrl></HeaderUrl>
    </header>
  );
}
