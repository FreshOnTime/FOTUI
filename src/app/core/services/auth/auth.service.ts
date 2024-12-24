import { Injectable, signal, computed } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  AuthError,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  user,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { from, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.template';
import { AuthUser } from '../../models/auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly actionCodeSettings = {
    url: `${environment.ENV_FRONTEND_DOMAIN}/verify-email`,
    handleCodeInApp: true,
  };

  user$: Observable<User | null>;
  currentUserSignal = signal<AuthUser | null | undefined>(undefined);

  isAuthenticated = computed(
    () =>
      this.currentUserSignal() !== null &&
      this.currentUserSignal() !== undefined
  );

  isEmailVerified = computed(
    () => this.currentUserSignal()?.emailVerified ?? false
  );

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);

    // Initialize signal with current auth state
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      this.currentUserSignal.set({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        emailVerified: currentUser.emailVerified,
        photoURL: currentUser.photoURL,
      });
    } else {
      this.currentUserSignal.set(null);
    }

    this.setupAuthStateListener();
  }

  private setupAuthStateListener(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const authUser: AuthUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
        };
        // Update the signal whenever auth state changes
        this.currentUserSignal.set(authUser);
      } else {
        this.currentUserSignal.set(null);
      }
    });
  }

  public register(
    email: string,
    password: string,
    displayName: string
  ): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password).then(
        async (response) => {
          await updateProfile(response.user, { displayName });
          await sendEmailVerification(response.user, this.actionCodeSettings);
        }
      )
    ).pipe(
      catchError((error: AuthError) => {
        const errorMessage = this.getErrorMessage(error.code);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  public login(email: string, password: string): Observable<void> {
    return from(
      signInWithEmailAndPassword(this.auth, email, password).then(
        async (response) => {
          // if (!response.user.emailVerified) {
          //   await sendEmailVerification(response.user, this.actionCodeSettings);
          //   throw new Error(
          //     'Please verify your email. A new verification email has been sent.'
          //   );
          // }
        }
      )
    ).pipe(
      catchError((error: AuthError) => {
        const errorMessage = this.getErrorMessage(error.code);

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  public logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => this.currentUserSignal.set(null)),
      catchError((error: AuthError) => {
        const errorMessage = this.getErrorMessage(error.code);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  public resetPassword(email: string): Observable<void> {
    return from(
      sendPasswordResetEmail(this.auth, email, this.actionCodeSettings)
    ).pipe(
      catchError((error: AuthError) => {
        const errorMessage = this.getErrorMessage(error.code);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  public resendVerificationEmail(
    url: string = `${environment.ENV_FRONTEND_DOMAIN}`
  ): Observable<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      return throwError(() => new Error('No user is currently signed in'));
    }

    return from(
      sendEmailVerification(currentUser, {
        url: url,
        handleCodeInApp: true,
      })
    ).pipe(
      catchError((error: AuthError) => {
        const errorMessage = this.getErrorMessage(error.code);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private getErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/too-many-requests': 'Too many attempts. Try again later.',
      'auth/email-already-in-use': 'This email is already registered.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/operation-not-allowed':
        'This action is not allowed. Contact support.',
      'auth/requires-recent-login': 'Please log in again to continue.',
      'auth/invalid-action-code': 'The link is invalid or expired.',
      'auth/network-request-failed': 'Network error. Check your connection.',
      'auth/invalid-credential': 'Invalid credentials. Please try again.',
    };

    return errorMessages[errorCode] || `Something went wrong. (${errorCode})`;
  }
}
