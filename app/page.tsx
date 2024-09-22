'use client';

import { useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  //useEffect(() => {
  //throw new Error('Testing');
  //}, []);

  return (
    <main className={styles.main}>
      <p>This is the home page.</p>
    </main>
  );
}
