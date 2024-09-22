import styles from './header.module.css';
import HeaderUrl from './url';

function Header({}: {}) {
  return (
    <header className={styles.header}>
      <HeaderUrl></HeaderUrl>
    </header>
  );
}

export default Header;
