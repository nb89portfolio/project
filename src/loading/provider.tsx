import { ReactNode, Suspense } from 'react';
import LoadingFallback from './fallback';

export default function UseLoading({ children }: { children: ReactNode }) {
  return <Suspense fallback={LoadingFallback()}>{children}</Suspense>;
}
