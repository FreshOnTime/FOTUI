import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { DatePickerModule } from 'primeng/datepicker';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../order-service/order.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Bag } from '../../../models/bag-model';
import { ActivatedRoute, Router } from '@angular/router';
import { BagService } from '../../bags/bag-service/bag.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    TabsModule,
    CardModule,
    DatePickerModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent {
  public minOrderDate: Date;
  public maxOrderDate: Date;

  public orderForm: FormGroup;
  public orderError: string | null = null;

  public bag: Bag | null = null;

  constructor(
    private orderService: OrderService,
    private bagService: BagService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    const bagId = this.route.snapshot.paramMap.get('id');
    this.bag = this.bagService.getBagById(bagId);

    console.log('Bag:', this.bag);

    this.minOrderDate = this.orderService.getMinOrderDate();
    this.maxOrderDate = this.orderService.getMaxOrderDate();

    this.orderForm = this.fb.group({
      orderDate: [this.minOrderDate, [Validators.required]],
    });
  }

  public createOrder(): void {
    this.orderError = null;
    if (this.orderForm.valid) {
      const { orderDate } = this.orderForm.value;
      if (this.bag) {
        this.confirmOrderCreation(orderDate);
      }
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  private confirmOrderCreation(orderDate: Date): void {
    this.confirmationService.confirm({
      message: 'Do you want to place your order for this bag?',
      header: 'Place Order',
      icon: 'pi pi-shopping-bag',
      rejectLabel: 'Not Yet',
      rejectButtonProps: {
        label: 'Not Yet',
        severity: 'secondary',
        outlined: true,
        size: 'small',
      },
      acceptButtonProps: {
        label: 'Place Order',
        severity: 'success',
        size: 'small',
      },

      accept: () => {
        this.orderService.createOrder(orderDate, this.bag!).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Order Created',
              detail: 'Your order has been placed successfully!',
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'There was an issue placing your order. Please try again.',
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Order Not Placed',
          detail: 'You can place your order whenever you are ready.',
        });
      },
    });
  }
}
