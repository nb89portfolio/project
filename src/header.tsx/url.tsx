'use client';

import { usePathname } from 'next/navigation';

function getCapatalizedStrings(strings: String[]) {
  const recapatalizedStrings = strings.map((word) => {
    const firstChararacter = word.charAt(0);
    const capatalizedCharacter = firstChararacter.toUpperCase();
    const otherCharacters = word.slice(1);
    const string = capatalizedCharacter + otherCharacters;

    return string;
  });

  return recapatalizedStrings;
}

function getText(pathname: string) {
  const removedSlash = pathname.replaceAll('/', ' ');
  const lowercase = removedSlash.toLowerCase();
  const splitStrings = lowercase.split(' ');
  const recapatalizedStrings = getCapatalizedStrings(splitStrings);
  const url = recapatalizedStrings.join(' ');

  return url;
}

export default function HeaderUrl() {
  const pathname = usePathname();

  const url = getText(pathname);

  return <h1>{url}</h1>;
}
