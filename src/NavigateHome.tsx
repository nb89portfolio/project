"use client";

import { useRouter } from "next/navigation";

export default function NavigateHome() {
  const router = useRouter();

  return <button onClick={() => router.push("./")}>Go Home</button>;
}
