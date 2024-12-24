import { Component, HostListener } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { Tooltip } from 'primeng/tooltip';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService } from '../../services/auth/auth.service';
import { AuthUser } from '../../models/auth-user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    Toolbar,
    AvatarModule,
    SharedModule,
    ButtonModule,
    DividerModule,
    TruncatePipe,
    Tooltip,
    AvatarComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public isMobile: boolean = false;
  public userAddress: string =
    '75/13-A, 1st Floor, 1st Main, 1st Cross, 7th Block, Koramangala,';
  public userName: string = '';
  public userPhotoUrl: string =
    'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';

  public user: AuthUser | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.updateIsMobile();

    this.authService.user$.subscribe((user) => {
      this.user = user as AuthUser;
      console.log('User', this.user, user);
    });
  }

  public editUserAddress(): void {
    // Edit user address logic
    console.log('Edit user address clicked');
  }
  public onSearchClick(): void {
    // Search click logic
    console.log('Search clicked');
  }

  public onUserClick(): void {
    // User click logic
    console.log('User clicked');

    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out');
      },
      error: (err) => {
        console.error('Error logging out', err);
      },
    });
  }

  public onNotificationsClick(): void {
    // Notification click logic
    console.log('Notification clicked');
  }

  public onBagsClick(): void {
    // Bags click logic
    console.log('Bags clicked');
  }

  public onSignInClick(): void {
    this.router.navigate(['/sign-in']);
  }

  public onSignUpClick(): void {
    this.router.navigate(['/sign-up']);
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event): void {
    this.updateIsMobile();
  }

  private updateIsMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
