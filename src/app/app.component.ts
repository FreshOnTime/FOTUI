import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public showNavbar: boolean = true;
  public showFooter: boolean = true;

  private routesWithoutNavbarOrFooter: string[] = ['login', 'signup'];

  constructor(private router: Router, public authService: AuthService) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showNavbar =
        !this.routesWithoutNavbarOrFooter.includes(currentRoute);
      this.showFooter =
        !this.routesWithoutNavbarOrFooter.includes(currentRoute);
    });
  }

  register() {
    this.authService
      .register(
        'bhanukadassanayake@gmail.com',
        'Test@123',
        'Bhanuka Dassanayake'
      )
      .subscribe({
        next: () => console.log('User registered successfully'),
        error: (error) => console.error(error),
      });
  }

  login() {
    this.authService
      .login('bhanukadassanayake@gmail.com', 'Test@123')
      .subscribe({
        next: () => console.log('User logged in successfully'),
        error: (error) => console.error(error),
      });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => console.log('User logged out successfully'),
      error: (error) => console.error(error),
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe({
      next: (user) => {
        console.log('User:', user);
      },
    });
  }
}
