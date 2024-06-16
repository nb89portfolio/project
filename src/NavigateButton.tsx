"use client";

import { useRouter } from "next/navigation";

export default function NavigateHome({ path = "./" }: { path: string }) {
  const router = useRouter();

  return <button onClick={() => router.push(path)}>Go Home</button>;
}
