import type { Provider } from '@nestjs/common';

import { CONTACT_SERVICE } from '../constants';
import { ContactService } from '../services';

export const ContactServiceProvider: Provider = {
  provide: CONTACT_SERVICE,
  useClass: ContactService,
};
