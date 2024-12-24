import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

// This is a general guard, allows annonymous users to access the route but if the user logged in but not verified, it will redirect to verify-email page
export const generalGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map((user) => {
      if (user && !user.emailVerified) {
        router.navigate(['/verify-email']);
        return false;
      }
      return true;
    })
  );
};
