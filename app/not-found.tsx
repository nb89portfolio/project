"use client";

import MainLayout from "@/src/components/main/layout";
import NavigationButton from "@/src/components/navigate/component";
import parseUrlString from "@/src/functions/parseUrlString";
import { Route } from "@/src/models/navigation/types";
import { usePathname } from "next/navigation";

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
