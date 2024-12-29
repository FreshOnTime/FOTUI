import { BagProductModel } from './bag-product-model';
import { RecurringOrderLogic } from './recurring-order-logic';

export interface BagModel {
  id: string;
  name: string;
  items: BagProductModel[];
  isRecuring: boolean;
  recurringOrderLogics?: RecurringOrderLogic[];
  nextOrderDate?: Date;
  ordersDelivered?: number;
  ordersRemaining?: number;
  ordersCancelled?: number;
  ordersReturned?: number;
}
