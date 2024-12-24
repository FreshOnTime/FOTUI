import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { AuthService } from '../../services/auth/auth.service';
import { AuthUser } from '../../models/auth-user';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [Card, ButtonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  currentUser: AuthUser | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.currentUser = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          uid: user.uid,
        };
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
