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
  public pageLoading: boolean = false;
  public name: string = 'Fresh Tomatoes';
  public rating: number | undefined = 3.4;
  public price: number = 100;
  public description: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, varius metus. Nullam sit amet scelerisque elit. Nullam at semper turpis';
  public reviews: number = 100;
  badges: ('fast-delivery' | 'best-price' | 'trending')[] = [];

  public userBags: MenuItem[] | undefined;

  ngOnInit() {
    this.fetchBagsMenuItems();
    this.rating = this.getRating();
  }

  public getRating(): number | undefined {
    if (!this.rating || isNaN(this.rating)) return undefined;

    const nRating = Math.round(this.rating * 2) / 2;
    return nRating >= 1 ? nRating : undefined;
  }

  public getPrice(): string {
    return `LKR ${this.price.toFixed(2)}`;
  }

  public getBadgesData(): [string, string][] {
    const badgeMap: Record<string, [string, string]> = {
      'fast-delivery': ['Fast Delivery', 'pi pi-truck'],
      'best-price': ['Best Price', 'pi pi-money-bill'],
      trending: ['Trending', 'pi pi-chart-line'],
    };

    return this.badges.map((badge) => badgeMap[badge]).filter(Boolean);
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
