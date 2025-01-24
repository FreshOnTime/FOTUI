import { Address } from './address-model';
import { Bag } from './bag-model';
import { OrderSchedule } from './order-schedule';

export interface Order {
  description?: string;
  bag: Bag | undefined;
  deliveryAddress: Address | undefined;
  schedule: OrderSchedule | undefined;
  paymentMethod: 'CARD' | 'CASH_ON_DELIVERY' | 'BANK_TRANSFER' | undefined;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | undefined;
}
