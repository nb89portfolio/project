import { ReactNode, Suspense } from "react";
import Fallback from "./fallback";

type Props = {
  children: ReactNode;
};

export default function Loading({ children }: Props) {
  const fallback = <Fallback></Fallback>;

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
