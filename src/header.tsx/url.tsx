'use client';

import { usePathname } from 'next/navigation';

function HeaderUrl() {
  const pathname = usePathname();

  const url = pathname
    .replaceAll('/', ' ')
    .toLowerCase()
    .split(' ')
    .map((element) => {
      return element.charAt(0).toUpperCase() + element.slice(1);
    })
    .join(' ');

  const isHomeUrl = url === ' ';

  const text = isHomeUrl ? 'Home' : url;

  return <h1>{text}</h1>;
}

export default HeaderUrl;
