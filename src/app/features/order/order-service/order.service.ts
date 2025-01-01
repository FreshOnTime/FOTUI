import { Injectable } from '@angular/core';
import { Bag } from '../../../models/bag-model';
import { Observable } from 'rxjs';

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

  public createOrder(orderDate: Date, bag: Bag): Observable<any> {
    // Create order
    console.log('Order created:', orderDate, bag);
    return new Observable();
  }
}
