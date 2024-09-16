'use client';

type Keys = 'error';

type Payload = {
  user: string;
  data: any;
  time: {
    limit: number;
    current: number;
  };
};

function getCurrentHours() {
  const secondsInHours = 3600;

  const currentHours = new Date().getTime() / secondsInHours;

  return currentHours;
}

function set<Data>(key: Keys, user: string, data: Data, limit: number): void {
  const current = getCurrentHours();

  const time = { limit, current };

  const payload: Payload = { user, data, time };

  const string = JSON.stringify(payload);

  localStorage.setItem(key, string);
}

function get<Data, Revert>(
  key: Keys,
  user: string,
  revert: Revert
): Data | Revert {
  const cache = localStorage.getItem(key);

  const isCacheNull = cache === null;

  if (isCacheNull) {
    return revert;
  }

  const payload: Payload = JSON.parse(cache);

  const isUserValid = user === payload.user;

  if (!isUserValid) {
    return revert;
  }

  const updatedHours = getCurrentHours();

  const differaceInHours = updatedHours - payload.time.current;

  const isValidDifference = differaceInHours < payload.time.limit;

  if (isValidDifference) {
    return payload.data as Data;
  }

  return revert;
}

const clientCache = { set, get };

export default clientCache;
