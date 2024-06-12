import { ReactNode, Suspense } from "react";

function Fallback() {
  return (
    <main>
      <h2>Page is Loading</h2>
      <p>The page is loading. Please wait.</p>
    </main>
  );
}

export default function Loading({ children }: { children: ReactNode }) {
  return <Suspense fallback={Fallback()}>{children}</Suspense>;
}
