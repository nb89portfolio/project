'use client';

export function getCurrentHours(): number {
  const secondsInHours = 3600;

  const currentHours = new Date().getTime() / secondsInHours;

  return currentHours as number;
}
