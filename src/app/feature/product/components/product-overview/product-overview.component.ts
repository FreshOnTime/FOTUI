import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Image } from 'primeng/image';
import { Rating } from 'primeng/rating';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [Image, Skeleton, Rating, CommonModule, FormsModule],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
})
export class ProductOverviewComponent {
  public pageLoading: boolean = true;
  public rating: number | undefined = 4;
  public reviews: number = 100;
}
