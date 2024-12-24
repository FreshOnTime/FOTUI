import { Routes } from '@angular/router';
import { SignInComponent } from './core/pages/sign-in/sign-in.component';
import { SignUpComponent } from './core/pages/sign-up/sign-up.component';
import { loggedOutGuard } from './core/router-guards/logged-out.guard';
import { VerifyEmailComponent } from './core/pages/verify-email/verify-email.component';
import { generalGuardGuard } from './core/router-guards/general-guard.guard';
import { verifyEmailPageGuardGuard } from './core/router-guards/verify-email-page-guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    canActivate: [generalGuardGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [loggedOutGuard, generalGuardGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [loggedOutGuard, generalGuardGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [verifyEmailPageGuardGuard],
  },
];
