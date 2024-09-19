'use client';

import { usePathname } from 'next/navigation';
import getText from './text';

export default function HeaderUrl() {
  const pathname = usePathname();

  const url = getText(pathname);

  return <h1>{url}</h1>;
}
