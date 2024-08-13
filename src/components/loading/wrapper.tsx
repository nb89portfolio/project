import { ReactNode, Suspense } from "react";
import LoadingFallback from "./fallback";

type Props = {
  children: ReactNode;
};

export default function LoadingWrapper({ children }: Props) {
  const fallback = <LoadingFallback></LoadingFallback>;

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
