import parseUrlString from "@/src/functions/parseUrlString";
import { Route } from "@/src/models/navigation/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

type Props = {
  route: Route;
};

function buildText(route: Route) {
  const isHome = route === "/";

  if (isHome) {
    const text = "Home";

    return text;
  } else {
    const text = parseUrlString(route);

    return text;
  }
}

function navigateTo(router: AppRouterInstance, route: Route) {
  const isBack = route === "back";

  if (isBack) {
    router.back();
  } else {
    router.push(route);
  }
}

export default function NavigateButton({ route }: Props) {
  const router = useRouter();

  const text = buildText(route);

  return <button onClick={() => navigateTo(router, route)}>{text}</button>;
}
