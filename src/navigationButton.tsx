"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

type Path = "/";

type Props = {
  path: Path;
};

function navigateTo(router: AppRouterInstance, path: Path) {
  router.push(path);
}

export default function NavigationButton({ path }: Props) {
  const router = useRouter();

  return <button onClick={() => navigateTo(router, path)}>Home</button>;
}
