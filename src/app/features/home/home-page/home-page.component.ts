import { Component } from '@angular/core';
import { ProductCardComponent } from '../../product/components/product-card/product-card.component';

import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent, SplitButton],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  sortOptions: MenuItem[] = [
    { label: 'Price High to Low', icon: 'pi pi-sort-amount-up' },
    { label: 'Price Low to High', icon: 'pi pi-sort-amount-down' },
    { label: 'Rating', icon: 'pi pi-star' },
  ];
  filterOptions: MenuItem[] = [
    { label: 'Show All', icon: 'pi pi-list' },
    { label: 'Show Discounted', icon: 'pi pi-percentage' },
    { label: 'Show Trending', icon: 'pi pi-chart-line' },
  ];

  ngOnInit() {}
}
