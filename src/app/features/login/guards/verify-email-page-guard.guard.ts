import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { inject } from '@angular/core';

export const verifyEmailPageGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map((user) => {
      if (user) {
        if (user.emailVerified) {
          router.navigate(['/']);
          return false;
        }

        return true;
      } else {
        router.navigate(['/sign-in']);
        return false;
      }
    })
  );
};
