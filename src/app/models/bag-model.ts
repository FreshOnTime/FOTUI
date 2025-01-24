import { CustomerProduct } from './customer-product-model';
import { RecurringOrderLogic } from './recurring-order-logic';

export interface Bag {
  id: string;
  name: string;
  items: CustomerProduct[];
}
