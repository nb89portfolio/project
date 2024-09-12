type ClientCacheKey = 'error';

type ClientCachePayload = {
  user: string;
  data: any;
  time: {
    limit: number;
    current: number;
  };
};

function setClientCache<Data>(
  key: ClientCacheKey,
  user: string,
  data: Data,
  limit: number
): void {
  try {
    const secondsInHours = 3600;

    const current = new Date().getTime() / secondsInHours;

    const time = { limit, current };

    const payload: ClientCachePayload = { user, data, time };

    const string = JSON.stringify(payload);

    localStorage.setItem(key, string);
  } catch (error) {
    throw error;
  }
}

function getClientCache<Data, Revert>(
  key: ClientCacheKey,
  user: string,
  revert: Revert
): Data | Revert {
  try {
    const secondsInHours = 3600;

    const cache = localStorage.getItem(key);

    const isCacheNull = cache === null;

    if (isCacheNull) {
      return revert;
    }

    const payload: ClientCachePayload = JSON.parse(cache);

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
  } catch (error) {
    throw error;
  }
}

const clientCache = {
  set: setClientCache,
  get: getClientCache,
};

export default clientCache;
