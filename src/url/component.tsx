"use client";

import { usePathname } from "next/navigation";

function capatalizeStrings(strings: String[]) {
  const capatalizedStrings = strings.map((word) => {
    const firstChararacter = word.charAt(0);
    const capatalizedCharacter = firstChararacter.toUpperCase();
    const otherCharacters = word.slice(1);
    const rebuiltString = capatalizedCharacter + otherCharacters;

    return rebuiltString;
  });

  return capatalizedStrings;
}

function urlToText(pathname: string) {
  const noSlash = pathname.replaceAll("/", " ");
  const lowerCase = noSlash.toLowerCase();
  const splitStrings = lowerCase.split(" ");
  const capatalizedStrings = capatalizeStrings(splitStrings);
  const rebuildUrl = capatalizedStrings.join(" ");

  return rebuildUrl;
}

export default function UrlText({
  preText,
  postText,
}: {
  preText: string;
  postText: string;
}) {
  const pathname = usePathname();
  const url = urlToText(pathname);

  const string = preText + url + postText;

  return <>{string}</>;
}
