import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-order-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-schedule.component.html',
  styleUrl: './order-schedule.component.scss',
})
export class OrderScheduleComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      schedule: this.fb.array([this.createScheduleItem()]),
    });
  }

  // Initialize form with a schedule FormArray
  initForm() {
    this.orderForm = this.fb.group({
      schedule: this.fb.array([this.createScheduleItem()]),
    });
  }

  // Create a single schedule item FormGroup
  createScheduleItem(): FormGroup {
    return this.fb.group({
      condition: ['every', Validators.required],
      value: ['', Validators.required],
    });
  }

  // Accessor for schedule FormArray
  get schedule(): FormArray {
    return this.orderForm.get('schedule') as FormArray;
  }

  // Add a new schedule item (rule)
  addScheduleItem() {
    this.schedule.push(this.createScheduleItem());
  }

  // Remove a schedule item (rule) at a specific index
  removeScheduleItem(index: number) {
    this.schedule.removeAt(index);
  }

  // Update the value options dynamically based on the selected condition
  onConditionChange(index: number) {
    const condition = this.schedule.at(index).get('condition')?.value;
    const valueControl = this.schedule.at(index).get('value');

    // Reset the value field when changing condition
    valueControl?.reset();

    // Dynamically set the validator or default value based on condition
    switch (condition) {
      case 'every':
        valueControl?.setValidators([Validators.required]);
        break;
      case 'except':
        valueControl?.setValidators([Validators.required]);
        break;
      case 'onDate':
        valueControl?.setValidators([Validators.required]);
        break;
      default:
        valueControl?.clearValidators();
        break;
    }
    valueControl?.updateValueAndValidity();
  }

  // Submit form (for demonstration purposes)
  onSubmit() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
