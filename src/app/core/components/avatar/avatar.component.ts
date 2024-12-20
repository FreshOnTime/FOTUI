import { Component, Input, Output } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-avatar',
  imports: [Avatar, ButtonModule],
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() name: string = '';
  @Input() photoUrl?: string;

  @Input() click: () => void = () => {};

  initials: string = '';
  showFallback: boolean = false;

  private generateInitials(): void {
    const words = this.name.split(' ');
    if (this.name) {
      this.initials = words
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('');
    }
  }

  onImageError(): void {
    this.generateInitials();
    this, (this.photoUrl = undefined);
    this.showFallback = true;
  }
}
