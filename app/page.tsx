import styles from "./page.module.scss";
import ThrowError from "@/src/error/throwError";

export default function Home() {
  return (
    <main className={styles.main}>
      index <ThrowError></ThrowError>
    </main>
  );
}
