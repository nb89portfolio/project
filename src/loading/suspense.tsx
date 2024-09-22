import { ReactNode, Suspense } from 'react';
import LoadingFallback from './fallback';

function LoadingProvider({ children }: { children: ReactNode }) {
  return <Suspense fallback={LoadingFallback()}>{children}</Suspense>;
}

export default LoadingProvider;
