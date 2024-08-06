"use client";

import Main from "@/src/components/main/component";
import parseUrlString from "@/src/functions/parseUrlString";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const url = parseUrlString(pathname);

  const title = "Page not Found";

  const content = (
    <>
      <p>The page you are looking for, {url}, is not found.</p>
    </>
  );

  return <Main title={title} content={content}></Main>;
}
