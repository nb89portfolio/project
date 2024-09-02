"use client";

import { createContext } from "react";
import { UID } from "./types";

const UserIdContext = createContext<UID>({
  username: "",
  email: "",
  setUID: () => {},
});

export default UserIdContext;
