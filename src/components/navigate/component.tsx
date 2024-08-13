import { Route } from "@/src/models/navigation/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

type Props = {
  route: Route;
};

function navigateTo(router: AppRouterInstance, route: Route) {
  const isBack = route.text === "Back";

  return isBack ? router.back() : router.push(route.path);
}

export default function NavigationButton({ route }: Props) {
  const router = useRouter();

  const { path, text } = route;

  return <button onClick={() => navigateTo(router, route)}>{text}</button>;
}
