import { Component } from '@angular/core';
import { BagService } from '../../bags/bag-service/bag.service';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Address } from '../../../models/address-model';
import { OrderService } from '../order-service/order.service';
import { Bag } from '../../../models/bag-model';
import { TableModule } from 'primeng/table';
import { CustomerProduct } from '../../../models/customer-product-model';
import { Router } from '@angular/router';
import { OrderDateInputComponent } from '../order-date-input/order-date-input.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumber,
    TableModule,
    OrderDateInputComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  public bag: Bag | null = null;
  activeStep: number = 2;
  deliveryAddress: Address | null = null;

  deliveryAddressForm: FormGroup;
  paymentForm: FormGroup;
  scheduleForm: FormGroup;

  constructor(
    private bagService: BagService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.bag = bagService.getSelectedBag();
    this.deliveryAddressForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      streetAddress2: [''],
      city: ['', [Validators.required]],
      postalCode: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', [Validators.required]],
    });

    this.scheduleForm = this.fb.group({
      scheduleRules: [[], [Validators.required]],
    });
  }

  public onAddressSubmit(): void {
    if (this.deliveryAddressForm.valid) {
      this.deliveryAddress = this.deliveryAddressForm.value;
      this.activeStep = 2;
      console.log('Delivery Address:', this.deliveryAddress);
    } else {
      this.deliveryAddressForm.markAllAsTouched();
    }
  }

  public onScheduleSubmit(): void {
    if (this.scheduleForm.valid) {
      console.log('Schedule:', this.scheduleForm.value);
      this.activeStep = 3;
    } else {
      this.scheduleForm.markAllAsTouched();
    }
  }

  public onPaymentSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Payment:', this.paymentForm.value);
      this.activeStep = 3;
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  public goToViewBag(): void {
    this.bagService.setSelectedBag(null);
    this.router.navigate([`/bags/${this.bag?.id}`]);
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
}
