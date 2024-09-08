'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { Route } from './types';

function navigateTo(route: Route, router: AppRouterInstance) {
  switch (route) {
    case 'back':
      router.back();
      break;
    case 'refresh':
      router.refresh();
      break;
    case 'home':
      router.push('/');
      break;
    default:
      router.push('/');
  }
}

function captalizeRouteText(route: Route) {
  const firstCharacter = route.charAt(0);
  const capatalizeFirst = firstCharacter.toUpperCase();
  const remainingCharacters = route.slice(1);
  const rejoinStrings = capatalizeFirst + remainingCharacters;

  return rejoinStrings as string;
}

export default function UseNavigationButton({ route }: { route: Route }) {
  const router = useRouter();
  const text = captalizeRouteText(route);

  return <button onClick={() => navigateTo(route, router)}>{text}</button>;
}
