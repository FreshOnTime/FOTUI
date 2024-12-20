import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  register(
    email: string,
    password: string,
    displayName: string
  ): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
        .then(async (response) => {
          await updateProfile(response.user, { displayName: displayName });
          console.log(response.user);
          await sendEmailVerification(response.user); // add custom email verification url path
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              throw new Error('Email already in use');
            case 'auth/invalid-email':
              throw new Error('Invalid email');
            case 'auth/weak-password':
              throw new Error('Weak password');
            default:
              throw error;
          }
        })
    );
  }
}
