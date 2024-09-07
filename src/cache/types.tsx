type ClientCacheKey = 'error';

type ClientCache = {
  user: string;
  data: any;
  time: {
    limit: number;
    current: number;
  };
};

export type { ClientCacheKey, ClientCache };
