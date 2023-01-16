import { ModuleFC, ModuleType } from '#/Module';
import { DigitalClock } from '@/components/modules/DigitalClock';

export const moduleMap: Record<ModuleType, ModuleFC | null> = {
  [ModuleType.DigitalClock]: DigitalClock,
  [ModuleType.AnalogClock]: null
};
