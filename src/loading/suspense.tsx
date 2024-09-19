import { ReactNode, Suspense } from 'react';
import LoadingFallback from './fallback';

export default function LoadingProvider({ children }: { children: ReactNode }) {
  return <Suspense fallback={LoadingFallback()}>{children}</Suspense>;
}
