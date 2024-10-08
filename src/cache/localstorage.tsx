'use client';

type Key = 'user' | 'error';

type Payload<Type> = {
  data: Type;
  ttl: {
    hourlyLimit: number;
    setHourlyTime: number;
  };
};

export function setLocalStorage<Type>(
  username: string,
  key: Key,
  data: Type,
  hourlyLimit: number
) {
  const accessKey = username + key;

  const setHourlyTime = new Date().getHours();

  const payloadData: Payload<Type> = {
    data,
    ttl: {
      hourlyLimit,
      setHourlyTime,
    },
  };

  const payloadString = JSON.stringify(payloadData);

  localStorage.setItem(accessKey, payloadString);
}

export function getLocalStorage<Type>(username: string, key: Key) {
  if (typeof window !== 'undefined') {
    const accessKey = username + key;

    const payloadString = localStorage.getItem(accessKey);

    const isNotNull = payloadString !== null;

    if (!isNotNull) {
      return null;
    }

    const payloadData: Payload<Type> = JSON.parse(payloadString);

    const currentHourlyTime = new Date().getHours();

    const hourlyDifference = currentHourlyTime - payloadData.ttl.setHourlyTime;

    const validTime = hourlyDifference < payloadData.ttl.hourlyLimit;

    if (!validTime) {
      return null;
    }

    return payloadData.data;
  } else {
    return null;
  }
}
