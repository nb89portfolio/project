import styles from './header.module.css';
import { HeaderUrl } from './url';

export function Header({}: {}) {
  return (
    <header className={styles.header}>
      <HeaderUrl></HeaderUrl>
    </header>
  );
}
