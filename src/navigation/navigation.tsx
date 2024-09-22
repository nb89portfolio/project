'use client';

import { Route as NavigationRoute } from 'next';
import { useRouter } from 'next/navigation';

function navigateTo(route: NavigationRoute, route) {}

export default function NavigationButton({
  route,
}: {
  route: NavigationRoute;
}) {
  const router = useRouter();

  return <button onClick={() => navigateTo(route, router)}>{}</button>;
}
