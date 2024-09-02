"use client";

import { ReactNode, useState } from "react";
import UserIdContext from "./context";
import { UserId } from "./types";

export default function UserIdProvider({ children }: { children: ReactNode }) {
  const [userId, setUID] = useState<UserId>({ username: "", email: "" });

  return (
    <UserIdContext.Provider value={{ ...userId, setUID }}>
      {children}
    </UserIdContext.Provider>
  );
}
