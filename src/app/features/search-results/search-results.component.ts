import { Component } from '@angular/core';
import { ProductCardComponent } from '../product/product-card/product-card.component';
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [ProductCardComponent, SplitButton, Skeleton, ButtonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
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

  public searchQuery: string | null | undefined = undefined;
  public pageLoading: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.searchQuery = params.get('query');
    });
  }
}
