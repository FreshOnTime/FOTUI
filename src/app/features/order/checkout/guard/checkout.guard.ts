import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { BagService } from '../../../bags/bag-service/bag.service';
import { MessageService } from 'primeng/api';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const bagService = inject(BagService);
  const messageService = inject(MessageService);

  if (!bagService.getSelectedBag()) {
    messageService.add({
      severity: 'warn',
      summary: 'Empty Bag',
      detail: 'Please select a bag to checkout.',
    });
    return false;
  }
  return true;
};
