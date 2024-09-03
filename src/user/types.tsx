import { Dispatch, SetStateAction } from "react";

type UserId = {
  username: string;
  email: string;
};

type UID = UserId & {
  setUID: Dispatch<SetStateAction<UserId>>;
};

export type { UserId, UID };
