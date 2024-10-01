import { ReactNode, Suspense } from 'react';
import { LoadingFallback } from './fallback';

export function LoadingProvider({ children }: { children: ReactNode }) {
  return <Suspense fallback={LoadingFallback()}>{children}</Suspense>;
}
