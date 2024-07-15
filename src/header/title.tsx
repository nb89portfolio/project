"use client";

import { usePathname } from "next/navigation";

function parseUrl(url: string) {
  const noSlash = url.replace("/", "");
  const firstChar = noSlash.charAt(0);
  const uppercase = firstChar.toUpperCase();
  const rebuild = uppercase + noSlash.slice(1);

  return rebuild as string;
}

export default function Title() {
  const url = usePathname();

  const heading = parseUrl(url);

  return <h1>{heading}</h1>;
}
