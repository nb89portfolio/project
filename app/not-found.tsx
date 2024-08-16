"use client";

import MainLayout from "@/src/components/main/layout";
import NavigationButton from "@/src/components/navigate/component";
import { Route } from "@/src/models/navigation/types";
import { usePathname } from "next/navigation";

function getCapatalizedStrings(strings: String[]) {
  return strings.map((word) => {
    const firstChararacter = word.charAt(0);
    const capatalizedCharacter = firstChararacter.toUpperCase();
    const otherCharacters = word.slice(1);
    const rebuiltString = capatalizedCharacter + otherCharacters;

    return rebuiltString;
  });
}

function parseUrlString(pathname: string) {
  const noSlashString = pathname.replaceAll("/", " ");
  const lowerCaseString = noSlashString.toLowerCase();
  const seperatedStrings = lowerCaseString.split(" ");
  const capatalizedStrings = getCapatalizedStrings(seperatedStrings);
  const rebuildUrl = capatalizedStrings.join(" ");

  return rebuildUrl;
}

export default function NotFound() {
  const pathname = usePathname();
  const url = parseUrlString(pathname);

  const title = "Page not Found";

  const homeRoute: Route = { path: "/", text: "Home" };

  const backRoute: Route = { path: "", text: "Back" };

  const content = (
    <>
      <p>The page {url} is not found.</p>
      <NavigationButton route={homeRoute}></NavigationButton>
      <NavigationButton route={backRoute}></NavigationButton>
    </>
  );

  return <MainLayout title={title} content={content}></MainLayout>;
}
