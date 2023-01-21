import { ModuleFC, ModuleType } from '#/Module';
import { DigitalClockModule } from '@/components/modules/DigitalClock';
import { PathArrivalsModule } from '@/components/modules/PathArrivals';

export const moduleMap: Record<ModuleType, ModuleFC<{}> | null> = {
  [ModuleType.DigitalClock]: DigitalClockModule,
  [ModuleType.AnalogClock]: null,
  [ModuleType.PathTrainArrivals]: PathArrivalsModule
};
