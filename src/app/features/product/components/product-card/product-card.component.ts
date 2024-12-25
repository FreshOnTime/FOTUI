import { Component, Input } from '@angular/core';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Router } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [Tag, Rating, FormsModule, ButtonModule, Menu, Skeleton],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() id: string = '';
  @Input() name: string = 'Fresh Tomatoes';
  @Input() price: number = 0;
  @Input() rating: number | undefined = 0;
  @Input() totalRatings: number = 0;
  @Input() discount: number = 0;
  @Input() image: string = '/placeholder.jpg';
  @Input() badges: ('fast-delivery' | 'best-price' | 'trending')[] = [];

  @Input() loading: boolean = false;

  constructor(private router: Router) {}

  public userBags: MenuItem[] | undefined;

  public getDiscountTagColor():
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | undefined {
    if (this.discount >= 75) {
      return 'danger';
    } else if (this.discount >= 50) {
      return 'warn';
    } else if (this.discount >= 25) {
      return 'success';
    } else if (this.discount > 0.01) {
      return 'info';
    } else {
      return undefined;
    }
  }

  ngOnInit() {
    this.rating = this.getRating();
    this.fetchBagsMenuItems();
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

  public goToProductOverview(): void {
    this.router.navigate(['/product', this.id]);
  }
}
