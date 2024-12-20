import { Component, HostListener } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { Tooltip } from 'primeng/tooltip';
import { AvatarComponent } from '../avatar/avatar.component';
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
  public userName: string = 'John Doe';
  public userPhotoUrl: string =
    'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';

  constructor() {
    this.updateIsMobile();
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
  }

  public onNotificationsClick(): void {
    // Notification click logic
    console.log('Notification clicked');
  }

  public onBagsClick(): void {
    // Bags click logic
    console.log('Bags clicked');
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event): void {
    this.updateIsMobile();
  }

  private updateIsMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
