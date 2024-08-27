"use client";

import { createContext, ReactNode, useState } from "react";
import { ErrorReports, ErrorReport } from "./types";

export const ErrorReportsContext = createContext<ErrorReports>({
  errorReports: [],
  setState: () => {},
});

export default function ErrorReportWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [errorReports, setState] = useState<ErrorReport[]>([]);

  return (
    <ErrorReportsContext.Provider value={{ errorReports, setState }}>
      {children}
    </ErrorReportsContext.Provider>
  );
}
