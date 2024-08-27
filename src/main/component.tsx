import { ReactNode } from "react";

export default function Main({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main>
      <h2>{title}</h2>
      {children}
    </main>
  );
}
