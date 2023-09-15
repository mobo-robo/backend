import type { Provider } from '@nestjs/common';

import { DEVICE_SERVICE } from '../constants';
import { DeviceService } from '../services';

export const DeviceServiceProvider: Provider = {
  provide: DEVICE_SERVICE,
  useClass: DeviceService,
};
