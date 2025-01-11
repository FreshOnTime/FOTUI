import { Injectable } from '@angular/core';
import { Bag } from '../../../models/bag-model';
import { Observable } from 'rxjs';
import { CustomerProduct } from '../../../models/customer-product-model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  public getMinOrderDate(): Date {
    // Get this from sever, don't use client time. this is for testing only
    const now = new Date();
    const minOrderDate = new Date(now);
    minOrderDate.setDate(minOrderDate.getDate() + 3); // Minimum order date is 3 days from now
    return minOrderDate;
  }

  public getMaxOrderDate(): Date {
    // Get this from sever, don't use client time. this is for testing only
    const now = new Date();
    const maxOrderDate = new Date(now);
    maxOrderDate.setDate(maxOrderDate.getDate() + 30); // Maximum order date is 30 days from now
    return maxOrderDate;
  }

  public currentDate(): Date {
    // Get this from sever, don't use client time. this is for testing only
    return new Date();
  }

  public calculateBagTotals(bag: Bag) {
    let originalPrice = 0;
    let savings = 0;
    let serviceFee = 0;
    let total = 0;

    bag.items.forEach((item: CustomerProduct) => {
      const price =
        (item.buyingQuantity / item.baseUnitQuantity) * item.pricePerUnit;
      originalPrice += price;
      const discountPercentage = item.discountPercentage || 0;
      savings += (price * discountPercentage) / 100;
      serviceFee += price * 0.3;
    });

    if (serviceFee < 500) {
      serviceFee = 500;
    }

    total = originalPrice - savings + serviceFee;

    return {
      originalPrice: Math.round(originalPrice * 100) / 100,
      savings: Math.round(savings * 100) / 100,
      serviceFee: Math.round(serviceFee * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }

  public createOrder(orderDate: Date, bag: Bag): Observable<any> {
    // Create order
    console.log('Order created:', orderDate, bag);
    return new Observable();
  }
}
