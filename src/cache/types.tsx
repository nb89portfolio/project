type ClientCacheKeys = 'error' | 'user';

type ClientCacheData<Data> = {
  username: string;
  data: Data;
  ttl: {
    hourlyLimit: number;
    initialHours: number;
  };
};

export type { ClientCacheKeys, ClientCacheData };
