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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BagService } from '../bag-service/bag.service';
import { OrderService } from '../../order/order-service/order.service';

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
  public bagId: string | null = null;

  selectedItems!: CustomerProduct[] | null;

  constructor(
    public screenService: ScreenService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private bagService: BagService,
    private orderService: OrderService
  ) {
    this.screenService.getScreenWidth().subscribe((width) => {
      this.isMobile = this.screenService.getCurrentBreakpoint() === 'xs';
    });

    this.pageLoading = true;
    this.bagId = this.route.snapshot.paramMap.get('id');
    this.bag = this.bagService.getBagById(this.bagId);
    this.pageLoading = false;
  }

  private pressHoldSubscription: Subscription | null = null;

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
    return this.orderService.calculateBagTotals(item).originalPrice;
  }

  public geTotal(item: Bag): number {
    return this.orderService.calculateBagTotals(item).total;
  }

  public getServiceFee(item: Bag): number {
    return this.orderService.calculateBagTotals(item).serviceFee;
  }

  public getTotalSavings(item: Bag): number {
    return this.orderService.calculateBagTotals(item).savings;
  }

  public goToCheckout(): void {
    if (this.bag!.items.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Empty Bag',
        detail: 'Your bag is empty. Please add items to checkout.',
      });
      return;
    }

    this.router.navigate(['/checkout']);
    this.bagService.setSelectedBag(this.bag!);
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
