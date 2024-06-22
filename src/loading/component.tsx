import { ReactNode, Suspense } from "react";

function LoadingFallback() {
  return (
    <main>
      <h2>Page is Loading</h2>
      <p>The page is loading. Please wait.</p>
    </main>
  );
}

export default function LoadingWrapper({ children }: { children: ReactNode }) {
  return <Suspense fallback={LoadingFallback()}>{children}</Suspense>;
}
