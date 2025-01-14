import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order-service/order.service';
import { ScheduleRule } from '../../../models/schedule-rule';
import { MessageService } from 'primeng/api';
import { OrderSchedule } from '../../../models/order-schedule';

@Component({
  selector: 'app-order-date-input',
  standalone: true,
  imports: [
    SelectModule,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './order-date-input.component.html',
  styleUrl: './order-date-input.component.scss',
})
export class OrderDateInputComponent {
  public scheduleForm: FormGroup;
  public minOrderDate: Date | undefined;
  public maxOrderDate: Date | undefined;
  public currentDate: Date = new Date();

  conditions: any[] = [
    { name: 'Every', value: 'every' },
    { name: 'Exclude', value: 'exclude' },
    { name: 'Set', value: 'set' },
  ];

  days: any[] = [
    { name: 'Weekday', value: 'weekday', type: 'day' },
    { name: 'Weekend', value: 'weekend', type: 'day' },
    { name: 'Monday', value: 'monday', type: 'day' },
    { name: 'Tuesday', value: 'tuesday', type: 'day' },
    { name: 'Wednesday', value: 'wednesday', type: 'day' },
    { name: 'Thursday', value: 'thursday', type: 'day' },
    { name: 'Friday', value: 'friday', type: 'day' },
    { name: 'Saturday', value: 'saturday', type: 'day' },
    { name: 'Sunday', value: 'sunday', type: 'day' },
    { name: "Month's End", value: 'monthEnd', type: 'day' },
    { name: "Month's Start", value: 'monthStart', type: 'day' },
  ];

  generateNumericValues(): any[] {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    return Array.from({ length: 31 }, (_, i) => {
      const value = i + 1;
      const suffix =
        value % 10 < 4 && value % 10 > 0 && ![11, 12, 13].includes(value)
          ? suffixes[value % 10]
          : suffixes[0];
      return { name: `${value}${suffix}`, value, type: 'numeric' };
    });
  }

  numericValues: any[] = this.generateNumericValues();

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private messageService: MessageService
  ) {
    this.scheduleForm = this.fb.group({
      schedule: this.fb.array([this.createScheduleItem()], Validators.required),
    });

    this.scheduleForm.get('schedule')?.disable();

    this.orderService
      .getMinOrderDate()
      .subscribe((minOrderDate) => {
        this.minOrderDate = minOrderDate;
      })
      .add(() => {
        this.orderService.getMaxOrderDate().subscribe((maxOrderDate) => {
          this.maxOrderDate = maxOrderDate;
          this.scheduleForm.get('schedule')?.enable();
        });
      });

    orderService.getCurrentDate().subscribe((currentDate) => {
      this.currentDate = currentDate;
    });
  }

  get schedule(): FormArray {
    return this.scheduleForm.get('schedule') as FormArray;
  }

  public createScheduleItem(
    condition: any = this.conditions[0],
    value: any = this.days[0],
    type: string = 'day'
  ): FormGroup {
    return this.fb.group({
      condition: [condition, Validators.required],
      value: [value, Validators.required],
      type: [type, Validators.required],
    });
  }

  addScheduleItem() {
    this.schedule.push(this.createScheduleItem());
  }

  removeScheduleItem(index: number) {
    this.schedule.removeAt(index);
  }

  onTypeChange(index: number) {
    const type = this.schedule.at(index).get('type')?.value;
    const valueControl = this.schedule.at(index).get('value');

    valueControl?.reset();
  }

  onScheduleRulwConditionChange(index: number) {
    const condition = this.schedule.at(index).get('condition')?.value.value;
    const valueControl = this.schedule.at(index).get('value');
    const typeControl = this.schedule.at(index).get('type');

    valueControl?.reset();

    switch (condition) {
      case 'every':
        valueControl?.setValidators([Validators.required]);
        if (typeControl?.value === 'date') {
          typeControl?.setValue('day');
        }
        break;
      case 'exclude':
        valueControl?.setValidators([Validators.required]);
        break;
      case 'set':
        valueControl?.setValidators([Validators.required]);

        typeControl?.setValue('date');
        break;
      default:
        valueControl?.clearValidators();
        break;
    }
    valueControl?.updateValueAndValidity();
    typeControl?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.scheduleForm.invalid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }

    // Check if the rules are only have 'exclude' conditions
    const excludeRules = this.schedule.value.filter(
      (rule: { condition: any }) => rule.condition.value === 'exclude'
    );

    if (excludeRules.length === this.schedule.value.length) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Schedule',
        detail: 'Schedule must have at least one rule that is not an exclude',
      });
      return;
    }

    const scheduleRules: ScheduleRule[] = this.schedule.value.map(
      (rule: { condition: any; value: any; type: any }) => {
        return {
          condition: rule.condition.value,
          value: rule.value.value || rule.value,
          type: rule.type,
        };
      }
    );

    const orderSchedule: OrderSchedule = {
      rules: scheduleRules,
      recurring: true,
    };

    this.orderService.setCheckoutState(orderSchedule);
    this.orderService.computeUpcomingOrderDates(
      this.currentDate,
      10,
      scheduleRules
    );

    console.log('Order Schedule:', this.orderService.getCheckoutState());
  }
}
