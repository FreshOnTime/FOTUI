import { Routes } from '@angular/router';
import { SignInComponent } from './features/login/pages/sign-in/sign-in.component';
import { SignUpComponent } from './features/login/pages/sign-up/sign-up.component';
import { loggedOutGuard } from './features/login/guards/logged-out.guard';
import { VerifyEmailComponent } from './features/login/pages/verify-email/verify-email.component';
import { generalGuardGuard } from './shared/guards/general-guard.guard';
import { verifyEmailPageGuardGuard } from './features/login/guards/verify-email-page-guard.guard';

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
