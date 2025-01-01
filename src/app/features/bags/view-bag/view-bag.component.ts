import { Component, Host, HostListener } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Bag } from '../../../models/bag-model';
import { CustomerProduct } from '../../../models/customer-product-model';
import { RippleModule } from 'primeng/ripple';
import { interval, Subscription } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { ScreenService } from '../../../shared/services/screen/screen.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-bag',
  standalone: true,
  imports: [
    TableModule,
    RippleModule,
    Skeleton,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    CardModule,
    CurrencyPipe,
    RouterModule,
  ],

  templateUrl: './view-bag.component.html',
  styleUrl: './view-bag.component.scss',
})
export class ViewBagComponent {
  public pageLoading: boolean = false;
  isMobile: boolean = false;

  public bag: Bag | null = null;

  selectedItems!: CustomerProduct[] | null;

  constructor(
    public screenService: ScreenService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.screenService.getScreenWidth().subscribe((width) => {
      this.isMobile = this.screenService.getCurrentBreakpoint() === 'xs';
      console.log('Is mobile:', this.isMobile);
    });

    this.pageLoading = true;
    this.simulatingFetchFromServer().then((data) => {
      this.bag = data.bag;
      this.pageLoading = false;
    });
  }

  private pressHoldSubscription: Subscription | null = null;

  private simulatingFetchFromServer(): Promise<{
    bag: Bag;
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
                productID: '3gch',
                baseUnitQuantity: 1000,
                pricePerUnit: 500,
                measurementType: 'g',
                minQuantity: 500,
                maxQuantity: 10000,
                incrementStep: 100,
                buyingQuantity: 800,
                discountPercentage: 10,
              },

              {
                id: '3',
                productID: 'nbv',
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
                id: '2',
                productID: 'vhgc',
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
              {
                id: '4',
                productID: 'bnvhg',
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
            ],
          },
        });
      }, 1000);
    });
  }

  public getItemPrice(
    item: CustomerProduct,
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

  public getOriginalPrice(item: Bag): number {
    let subTotal = 0;

    for (const item of this.bag!.items) {
      subTotal += this.getItemPrice(item, false);
    }

    return Math.round(subTotal * 100) / 100;
  }

  public getNetTotal(item: Bag): number {
    return (
      this.getOriginalPrice(item) -
      this.getTotalSavings(item) +
      this.getServiceFee(item)
    );
  }

  public getServiceFee(item: Bag): number {
    let serviceFee =
      (this.getOriginalPrice(item) - this.getTotalSavings(item)) * 0.3;

    if (serviceFee < 500) {
      return 500;
    }

    return Math.round(serviceFee * 100) / 100;
  }

  public getTotalSavings(item: Bag): number {
    let savings = 0;

    for (const item of this.bag!.items) {
      savings += this.getItemPrice(item, false) - this.getItemPrice(item);
    }

    return Math.round(savings * 100) / 100;
  }

  ///////// Remove Item //////////

  public onRemoveItem(item: CustomerProduct): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this item from your bag?',
      header: 'Remove Item',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
        size: 'small',
      },
      acceptButtonProps: {
        label: 'Remove',
        severity: 'danger',
        size: 'small',
      },

      accept: () => {
        try {
          this.bag!.items = this.bag!.items.filter((i) => i.id !== item.id);
          this.selectedItems = null;

          this.messageService.add({
            severity: 'success',
            summary: 'Item Removed',
            detail: `${item.name} has been removed from your bag.`,
          });
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while removing the item.',
          });
        }
      },
      reject: () => {
        this.selectedItems = null;
      },
    });
  }

  public onRemoveItems(items: CustomerProduct[]): void {
    if (!items || items.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Items Selected',
        detail: 'Please select items to remove from your bag.',
      });
      return;
    }

    const itemNames = items.map((item) => item.name).join(', ');

    this.confirmationService.confirm({
      message: `Are you sure you want to remove the selected items (${itemNames}) from your bag?`,
      header: 'Remove Items',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
        size: 'small',
      },
      acceptButtonProps: {
        label: 'Remove',
        severity: 'danger',
        size: 'small',
      },
      accept: () => {
        try {
          // Remove selected items from the bag
          this.bag!.items = this.bag!.items.filter(
            (bagItem) =>
              !items.some((selectedItem) => selectedItem.id === bagItem.id)
          );
          this.selectedItems = null;

          this.messageService.add({
            severity: 'success',
            summary: 'Items Removed',
            detail: `${items.length} item(s) have been removed from your bag.`,
          });
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while removing the items.',
          });
        }
      },
      reject: () => {
        this.selectedItems = null;
      },
    });
  }

  public incrementBuyingQuantity(item: CustomerProduct): void {
    this.pressHoldSubscription = interval(80).subscribe(() => {
      if (item.buyingQuantity + item.incrementStep > item.maxQuantity) {
        return;
      }
      item.buyingQuantity += item.incrementStep;
    });
  }

  public decrementBuyingQuantity(item: CustomerProduct): void {
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
