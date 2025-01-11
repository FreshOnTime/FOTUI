import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';

@Component({
  selector: 'app-order-date-input',
  standalone: true,
  imports: [
    SelectModule,
    ReactiveFormsModule,
    DatePickerModule,
    RadioButton,
    FormsModule,
  ],
  templateUrl: './order-date-input.component.html',
  styleUrl: './order-date-input.component.scss',
})
export class OrderDateInputComponent {
  public scheduleForm: FormGroup;
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

  numericValues: any[] = [
    { name: '1st', value: '1st', type: 'numeric' },
    { name: '2nd', value: '2nd', type: 'numeric' },
    { name: '3rd', value: '3rd', type: 'numeric' },
    { name: '4th', value: '4th', type: 'numeric' },
    { name: '5th', value: '5th', type: 'numeric' },
    // till 31st
    { name: '6th', value: '6th', type: 'numeric' },
    { name: '7th', value: '7th', type: 'numeric' },
    { name: '8th', value: '8th', type: 'numeric' },
    { name: '9th', value: '9th', type: 'numeric' },
    { name: '10th', value: '10th', type: 'numeric' },
    { name: '11th', value: '11th', type: 'numeric' },
    { name: '12th', value: '12th', type: 'numeric' },
    { name: '13th', value: '13th', type: 'numeric' },
    { name: '14th', value: '14th', type: 'numeric' },
    { name: '15th', value: '15th', type: 'numeric' },
    { name: '16th', value: '16th', type: 'numeric' },
    { name: '17th', value: '17th', type: 'numeric' },
    { name: '18th', value: '18th', type: 'numeric' },
    { name: '19th', value: '19th', type: 'numeric' },
    { name: '20th', value: '20th', type: 'numeric' },
    { name: '21st', value: '21st', type: 'numeric' },
    { name: '22nd', value: '22nd', type: 'numeric' },
    { name: '23rd', value: '23rd', type: 'numeric' },
    { name: '24th', value: '24th', type: 'numeric' },
    { name: '25th', value: '25th', type: 'numeric' },
    { name: '26th', value: '26th', type: 'numeric' },
    { name: '27th', value: '27th', type: 'numeric' },
    { name: '28th', value: '28th', type: 'numeric' },
    { name: '29th', value: '29th', type: 'numeric' },
    { name: '30th', value: '30th', type: 'numeric' },
    { name: '31st', value: '31st', type: 'numeric' },
  ];

  constructor(private fb: FormBuilder) {
    this.scheduleForm = this.fb.group({
      schedule: this.fb.array([
        this.createScheduleItem(this.conditions[0], this.days[0], 'day'),
      ]),
    });
  }

  get schedule(): FormArray {
    return this.scheduleForm.get('schedule') as FormArray;
  }

  public createScheduleItem(
    condition: any,
    value: any,
    type: string
  ): FormGroup {
    return this.fb.group({
      condition: [condition, Validators.required],
      value: [value, Validators.required],
      type: [type, Validators.required],
    });
  }

  addScheduleItem() {
    this.schedule.push(this.createScheduleItem(null, null, 'day'));
  }

  removeScheduleItem(index: number) {
    this.schedule.removeAt(index);
  }

  onConditionChange(index: number) {
    const condition = this.schedule.at(index).get('condition')?.value.value;
    const valueControl = this.schedule.at(index).get('value');
    const typeControl = this.schedule.at(index).get('type');

    // valueControl?.reset();

    switch (condition) {
      case 'every':
        valueControl?.setValidators([Validators.required]);
        if (typeControl?.value === 'date') {
          typeControl?.setValue('day');
          valueControl?.reset();
        }
        break;
      case 'exclude':
        valueControl?.setValidators([Validators.required]);
        break;
      case 'set':
        valueControl?.setValidators([Validators.required]);
        valueControl?.reset();
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
      console.log('Form is invalid');
      return;
    }
    console.log(this.scheduleForm.value);
  }
}
