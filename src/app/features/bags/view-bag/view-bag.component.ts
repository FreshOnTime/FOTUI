import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BagModel } from '../../../models/bag-model';
import { BagProductModel } from '../../../models/bag-product-model';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { interval, Subscription } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-view-bag',
  standalone: true,
  imports: [TableModule, FormsModule, RippleModule, Skeleton],
  templateUrl: './view-bag.component.html',
  styleUrl: './view-bag.component.scss',
})
export class ViewBagComponent {
  public pageLoading: boolean = false;

  public bag: BagModel | null = null;

  constructor() {
    this.pageLoading = true;
    this.simulatingFetchFromServer().then((data) => {
      this.bag = data.bag;
      this.pageLoading = false;
    });
  }

  private pressHoldSubscription: Subscription | null = null;

  private simulatingFetchFromServer(): Promise<{
    bag: BagModel;
    serviceFee: number;
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          serviceFee: 1000,
          bag: {
            id: '#1032',
            name: 'My Bag',
            items: [
              {
                id: '1',
                name: 'Tomatoes',
                baseUnitQuantity: 1000,
                pricePerUnit: 500,
                measurementType: 'g',
                minQuantity: 500,
                maxQuantity: 10000,
                incrementStep: 100,
                buyingQuantity: 700,
                discountPercentage: 10,
              },
              {
                id: '2',
                name: 'Potatoes',
                baseUnitQuantity: 1,
                pricePerUnit: 50,
                measurementType: 'kg',
                minQuantity: 1,
                maxQuantity: 10,
                incrementStep: 1,
                buyingQuantity: 3,
              },
              {
                id: '3',
                name: 'Apples',
                baseUnitQuantity: 1,
                pricePerUnit: 100,
                measurementType: 'kg',
                minQuantity: 1,
                maxQuantity: 5,
                incrementStep: 1,
                buyingQuantity: 2,
                discountPercentage: 5,
              },
            ],
            isRecuring: false,
          },
        });
      }, 1000);
    });
  }

  public getItemPrice(
    item: BagProductModel,
    withDiscount: boolean = true
  ): number {
    const discount = item.discountPercentage || 0;
    let price =
      (item.buyingQuantity / item.baseUnitQuantity) * item.pricePerUnit;
    if (!withDiscount) {
      return price;
    }
    return price - (price * discount) / 100;
  }

  public getSubTotal(item: BagModel): number {
    let subTotal = 0;

    for (const item of this.bag!.items) {
      subTotal += this.getItemPrice(item, false);
    }

    return Math.round(subTotal * 100) / 100;
  }

  public getNetTotal(item: BagModel): number {
    return (
      this.getSubTotal(item) -
      this.getTotalSavings(item) +
      this.getServiceFee(item)
    );
  }

  public getServiceFee(item: BagModel): number {
    let serviceFee =
      (this.getSubTotal(item) - this.getTotalSavings(item)) * 0.3;

    if (serviceFee < 500) {
      return 500;
    }

    return Math.round(serviceFee * 100) / 100;
  }

  public getTotalSavings(item: BagModel): number {
    let savings = 0;

    for (const item of this.bag!.items) {
      savings += this.getItemPrice(item, false) - this.getItemPrice(item);
    }

    return Math.round(savings * 100) / 100;
  }

  public incrementBuyingQuantity(item: BagProductModel): void {
    this.pressHoldSubscription = interval(80).subscribe(() => {
      if (item.buyingQuantity + item.incrementStep > item.maxQuantity) {
        return;
      }
      item.buyingQuantity += item.incrementStep;
    });
  }

  public decrementBuyingQuantity(item: BagProductModel): void {
    this.pressHoldSubscription = interval(80).subscribe(() => {
      if (item.buyingQuantity - item.incrementStep < item.minQuantity) {
        return;
      }
      item.buyingQuantity -= item.incrementStep;
    });
  }

  stopPressAndHold(): void {
    if (this.pressHoldSubscription) {
      this.pressHoldSubscription.unsubscribe();
      this.pressHoldSubscription = null;
    }
  }
}
