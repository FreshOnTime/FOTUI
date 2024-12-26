import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment.template';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,

        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
      ripple: true,
    }),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: environment.ENV_FIREBASE_PROJECT_ID,
        appId: environment.ENV_FIREBASE_APP_ID,
        storageBucket: environment.ENV_FIREBASE_STORAGE_BUCKET,
        apiKey: environment.ENV_FIREBASE_API_KEY,
        authDomain: environment.ENV_FIREBASE_AUTH_DOMAIN,
        messagingSenderId: environment.ENV_FIREBASE_MESSAGING_SENDER_ID,
        measurementId: environment.ENV_FIREBASE_MEASUREMENT_ID,
      })
    ),
    provideAuth(() => getAuth()),
  ],
};
