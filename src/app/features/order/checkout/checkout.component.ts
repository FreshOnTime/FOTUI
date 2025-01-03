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
import { first } from 'rxjs';
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
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  activeStep: number = 2;
  deliveryAddress: Address | null = null;

  deliveryAddressForm: FormGroup;
  paymentForm: FormGroup;

  constructor(private bagService: BagService, private fb: FormBuilder) {
    console.log(bagService.getSelectedBag());
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
  }

  public onAddressSubmit(): void {
    if (this.deliveryAddressForm.valid) {
      this.deliveryAddress = this.deliveryAddressForm.value;
      this.activeStep = 2;
    } else {
      this.deliveryAddressForm.markAllAsTouched();
    }
  }

  onPaymentSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Payment:', this.paymentForm.value);
      this.activeStep = 3;
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }
}
