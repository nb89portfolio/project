'use client';

function getCurrentHours() {
  const secondsInHours = 3600;

  const currentHours = new Date().getTime() / secondsInHours;

  return currentHours as number;
}

export default getCurrentHours;
