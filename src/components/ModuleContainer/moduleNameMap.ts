import { Clock } from '@/modules/Clock';
import { FC } from 'react';

export const moduleNameMap: { [key: string]: FC; } = {
  clock: Clock
};
