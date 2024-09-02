"use client";

import { ReactNode, useState } from "react";
import { ErrorDefinition } from "./types";
import ErrorRecordContext from "./context";

export default function ErrorRecordProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [records, setRecords] = useState<ErrorDefinition[]>([]);

  return (
    <ErrorRecordContext.Provider value={{ records, setRecords }}>
      {children}
    </ErrorRecordContext.Provider>
  );
}
