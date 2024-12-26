import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Image } from 'primeng/image';
import { Menu } from 'primeng/menu';
import { Rating } from 'primeng/rating';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [Image, Skeleton, Rating, CommonModule, FormsModule, Menu],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
})
export class ProductOverviewComponent {
  public pageLoading: boolean = true;
  public rating: number | undefined = 4;
  public reviews: number = 100;

  public userBags: MenuItem[] | undefined;

  ngOnInit() {
    this.fetchBagsMenuItems();
  }

  public fetchBagsMenuItems(): void {
    // method to fetch user bags
    // right now just hard code menu
    this.userBags = [
      {
        label: 'Add to Bag',
        items: [
          {
            label: 'Create New',
            icon: 'pi pi-plus',
          },
          {
            label: 'Grocery Bag',
            icon: 'pi pi-shopping-bag',
          },
          {
            label: 'Dairy Bag',
            icon: 'pi pi-shopping-bag',
          },
        ],
      },
    ];
  }
}
