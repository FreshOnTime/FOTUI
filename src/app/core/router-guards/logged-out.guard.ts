import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, take } from 'rxjs';

// prevent logged in users from accessing this route
export const loggedOutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map((user) => {
      const isLoggedOut = !user;
      if (!isLoggedOut) {
        // Redirect to home
        router.navigate(['/']);
      }
      return isLoggedOut;
    })
  );
};
