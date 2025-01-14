import { Injectable } from '@angular/core';
import { Bag } from '../../../models/bag-model';
import { Observable } from 'rxjs';
import { CustomerProduct } from '../../../models/customer-product-model';
import { Order } from '../../../models/order-model';
import { ScheduleRule } from '../../../models/schedule-rule';
import ComputeNextOrders from './compute-next-orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private currentDate: Date | undefined;
  public checkoutState: Order = {
    bag: undefined,
    deliveryAddress: undefined,
    schedule: undefined,
    paymentMethod: undefined,
    paymentStatus: undefined,
  };

  constructor() {
    this.fetchCurrentDate().subscribe((date) => {
      this.currentDate = date;
    });
  }

  public getMinOrderDate(): Observable<Date> {
    return new Observable((observer) => {
      if (this.currentDate) {
        const minOrderDate = new Date(this.currentDate);
        minOrderDate.setDate(minOrderDate.getDate() + 3);
        observer.next(minOrderDate);
        observer.complete();
      } else {
        this.fetchCurrentDate().subscribe((date) => {
          this.currentDate = date;
          const minOrderDate = new Date(this.currentDate);
          minOrderDate.setDate(minOrderDate.getDate() + 3);
          observer.next(minOrderDate);
          observer.complete();
        });
      }
    });
  }

  public getMaxOrderDate(): Observable<Date> {
    return new Observable((observer) => {
      if (this.currentDate) {
        const maxOrderDate = new Date(this.currentDate);
        maxOrderDate.setDate(maxOrderDate.getDate() + 60);
        observer.next(maxOrderDate);
        observer.complete();
      } else {
        this.fetchCurrentDate().subscribe((date) => {
          this.currentDate = date;
          const maxOrderDate = new Date(this.currentDate);
          maxOrderDate.setDate(maxOrderDate.getDate() + 60);
          observer.next(maxOrderDate);
          observer.complete();
        });
      }
    });
  }

  public fetchCurrentDate(): Observable<Date> {
    // Get this from sever, don't use client time. this is for testing only
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(new Date());
        observer.complete();
      }, 500);
    });
  }

  public getCurrentDate(): Observable<Date> {
    return new Observable((observer) => {
      if (this.currentDate) {
        observer.next(this.currentDate);
        observer.complete();
      } else {
        this.fetchCurrentDate().subscribe((date) => {
          this.currentDate = date;
          observer.next(date);
          observer.complete();
        });
      }
    });
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

  public setCheckoutState(orderState: Partial<Order>): void {
    this.checkoutState = {
      ...this.checkoutState,
      ...orderState,
    };
  }

  public getCheckoutState(): Order | undefined {
    return this.checkoutState;
  }

  public createOrder(orderDate: Date, bag: Bag): Observable<any> {
    // Create order
    console.log('Order created:', orderDate, bag);
    return new Observable();
  }

  public computeUpcomingOrderDates(
    startDate: Date,
    maxDaysToCompute: number = 60,
    rules: ScheduleRule[] = []
  ) {
    return ComputeNextOrders.computeUpcomingOrderDates(
      startDate,
      maxDaysToCompute,
      rules
    );
  }
}
