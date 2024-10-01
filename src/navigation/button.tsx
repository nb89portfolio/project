'use client';

import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type NavigationRoute = 'home' | 'back' | 'refresh';

function navigateTo(route: NavigationRoute, router: AppRouterInstance) {
  switch (route) {
    case 'back':
      router.back();
    case 'refresh':
      router.refresh();
    case 'home':
      router.push('/');
    default:
      router.push('/');
  }
}

export function NavigationButton({ route }: { route: NavigationRoute }) {
  const router = useRouter();

  const text = route.charAt(0).toUpperCase + route.slice(1);

  return <button onClick={() => navigateTo(route, router)}>{text}</button>;
}
