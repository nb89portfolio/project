"use client";

import { useRouter } from "next/navigation";

type Props = {
  path?: string;
};

export default function NavigateHome({ path = "./" }: Props) {
  const router = useRouter();

  return <button onClick={() => router.push(path)}>Go Home</button>;
}
