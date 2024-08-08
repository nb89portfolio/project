"use client";

import Main from "@/src/components/main/component";
import NavigateButton from "@/src/components/navigate/component";
import parseUrlString from "@/src/functions/parseUrlString";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const url = parseUrlString(pathname);

  const title = "Page not Found";

  const content = (
    <>
      <p>The page you are looking for, {url}, is not found.</p>
      <NavigateButton route="/"></NavigateButton>
      <NavigateButton route="back"></NavigateButton>
    </>
  );

  return <Main title={title} content={content}></Main>;
}
