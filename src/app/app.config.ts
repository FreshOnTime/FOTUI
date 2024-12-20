import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

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
    }), provideFirebaseApp(() => initializeApp({"projectId":"fresh-on-time","appId":"1:722952706056:web:f704b7149f1153dd9959bd","storageBucket":"fresh-on-time.firebasestorage.app","apiKey":"AIzaSyCdAHSAMh5fq8N8CzAF7IqYPAxULwzDaPU","authDomain":"fresh-on-time.firebaseapp.com","messagingSenderId":"722952706056","measurementId":"G-XDJR7RJCB2"})), provideAuth(() => getAuth()),
  ],
};
