import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
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

  private routesWithoutNavbarOrFooter: string[] = [
    'login',
    'sign-up',
    'sign-in',
    'verify-email',
  ];

  constructor(
    private router: Router,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.updateNavFooterVisibility(event.url);
      }
    });
  }

  private updateNavFooterVisibility(currentRoute: string): void {
    const shouldHide = this.routesWithoutNavbarOrFooter.some((route) =>
      currentRoute.includes(route)
    );
    this.showNavbar = !shouldHide;
    this.showFooter = !shouldHide;
    this.cdr.detectChanges();
  }
}
