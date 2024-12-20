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

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showNavbar =
        !this.routesWithoutNavbarOrFooter.includes(currentRoute);
      this.showFooter =
        !this.routesWithoutNavbarOrFooter.includes(currentRoute);
    });
  }
}
