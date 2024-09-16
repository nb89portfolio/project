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

function set<Data>(key: Keys, user: string, data: Data, limit: number): void {
  try {
    const secondsInHours = 3600;

    const current = new Date().getTime() / secondsInHours;

    const time = { limit, current };

    const payload: Payload = { user, data, time };

    const string = JSON.stringify(payload);

    localStorage.setItem(key, string);
  } catch (error) {}
}

function get<Data, Revert>(
  key: Keys,
  user: string,
  revert: Revert
): Data | Revert | undefined {
  try {
    const secondsInHours = 3600;

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

    const updated = new Date().getTime() / secondsInHours;

    const differace = updated - payload.time.current;

    const isValid = differace < payload.time.limit;

    if (isValid) {
      return payload.data as Data;
    }

    return revert;
  } catch (error) {}
}

const clientCache = { set, get };

export default clientCache;
