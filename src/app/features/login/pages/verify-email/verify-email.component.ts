import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { AuthService } from '../../../../core/services/auth/auth.service';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [Card, ButtonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  currentUser: User | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  public sendVerificationEmail(): void {
    if (this.currentUser && !this.currentUser.emailVerified) {
      this.authService.resendVerificationEmail();
    }
  }
}
