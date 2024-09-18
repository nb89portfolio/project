export type ClientCacheKeys = 'error' | 'user';

export type ClientCacheData = {
  user: string;
  data: any;
  time: {
    limit: number;
    current: number;
  };
};
