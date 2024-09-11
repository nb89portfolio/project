'use client';

import { useRouter } from 'next/navigation';

export default function NotFoundNavigation() {
  const router = useRouter();

  return (
    <section>
      <button onClick={() => router.refresh()}>Refresh</button>
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => router.push('/')}>Home</button>
    </section>
  );
}
