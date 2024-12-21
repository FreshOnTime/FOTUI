import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButton } from 'primeng/togglebutton';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    StepperModule,
    ToggleButton,
    PasswordModule,
    IconField,
    InputIcon,
  ],

  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  name: string = '';

  email: string = '';

  password: string = '';
}
