import { Injectable } from '@angular/core';
import { Bag } from '../../../models/bag-model';
import { Observable } from 'rxjs';
import { CustomerProduct } from '../../../models/customer-product-model';
import { Order } from '../../../models/order-model';
import { ScheduleRule } from '../../../models/schedule-rule';

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

  public calculateOrdersUpto(
    currentDate: Date,
    numdays: number = 60,
    rules: ScheduleRule[] = []
  ): Date[] {
    const alldays = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const weekdays = alldays.slice(1, 6);
    const weekends = [alldays[0], alldays[6]];

    let nextOrderDates: Date[] = [];

    if (!currentDate) {
      return [];
    }

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    function getOperatingTimezoneDate(date: Date): Date {
      return new Date(
        date.toLocaleString('en-US', { timeZone: 'Asia/Colombo' })
      );
    }

    let adjustedCurrentDate: Date = getOperatingTimezoneDate(currentDate); // don't need do this since we are using backend date but just in case

    function getDayName(date: Date): string {
      const day = date.getDay();
      return alldays[day];
    }

    function isWeekday(date: Date): boolean {
      return weekdays.includes(getDayName(date));
    }

    function isWeekend(date: Date): boolean {
      return weekends.includes(getDayName(date));
    }

    function isDay(date: Date, day: string): boolean {
      return getDayName(date) === day;
    }

    function isMonthStart(date: Date): boolean {
      return date.getDate() === 1;
    }

    function isMonthEnd(date: Date): boolean {
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return date.getDate() === lastDay.getDate();
    }

    function isNumeric(date: Date, value: number): boolean {
      return date.getDate() === value;
    }

    function isDayOfWeek(date: Date, day: string): boolean {
      return isDay(date, day);
    }

    let totaldaysChecked = 0;
    let nextDate = adjustedCurrentDate;

    while (totaldaysChecked < numdays) {
      for (const rule of rules) {
        const tempDate = new Date(nextDate);
        if (rule.condition === 'every') {
          if (rule.type === 'day') {
            if (rule.value === 'weekday' && isWeekday(nextDate)) {
              if (
                !nextOrderDates.find(
                  (date) => date.getTime() === tempDate.getTime()
                )
              ) {
                nextOrderDates.push(tempDate);
              }
            } else if (rule.value === 'weekend' && isWeekend(nextDate)) {
              if (
                !nextOrderDates.find(
                  (date) => date.getTime() === tempDate.getTime()
                )
              ) {
                nextOrderDates.push(tempDate);
              }
            } else if (rule.value === 'monthStart' && isMonthStart(nextDate)) {
              if (
                !nextOrderDates.find(
                  (date) => date.getTime() === tempDate.getTime()
                )
              ) {
                nextOrderDates.push(tempDate);
              }
            }
          }
        }
      }

      nextDate.setDate(nextDate.getDate() + 1);
      totaldaysChecked++;
    }

    console.log(
      nextOrderDates.map((date) => {
        return `${formatter.format(date)} is ${getDayName(date)}`;
      })
    );

    return nextOrderDates;
  }
}
