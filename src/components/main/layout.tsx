import { ReactNode } from "react";
import styles from "./styles.module.css";

type Props = {
  title: string;
  content: ReactNode;
};

export default function MainLayout({ title, content }: Props) {
  return (
    <main className={styles.main}>
      <h2>{title}</h2>
      {content}
    </main>
  );
}
