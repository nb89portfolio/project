import { ReactNode, Suspense } from "react";
import Fallback from "./fallback";

type Props = {
  children: ReactNode;
};

export default function Loading({ children }: Props) {
  return <Suspense fallback={<Fallback></Fallback>}>{children}</Suspense>;
}
