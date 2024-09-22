'use client';

import { useRouter } from 'next/navigation';
import { NavigationRoute } from './types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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

export default function NavigationButton({
  route,
}: {
  route: NavigationRoute;
}) {
  const router = useRouter();

  const text = route.charAt(0).toUpperCase + route.slice(1);

  return <button onClick={() => navigateTo(route, router)}>{text}</button>;
}
