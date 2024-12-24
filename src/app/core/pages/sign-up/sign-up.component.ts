import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { passwordMatchValidator } from '../../validators/password-match-validator';
import { first, last } from 'rxjs';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    Card,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  registerForm: FormGroup;
  registerError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: passwordMatchValidator }
    ); // Add the validator here
  }

  // Helper getter for template
  get passwordsMatch(): boolean {
    return !this.registerForm.errors?.['passwordMismatch'];
  }

  public signUp(): void {
    this.registerError = null;

    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;

      let name = `${firstName} ${lastName}`;
      name = name.trim();

      this.authService.register(email, password, name).subscribe({
        next: () => {
          this.router.navigate(['/verify-email']);
        },
        error: (err) => {
          this.registerError = err.message;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
