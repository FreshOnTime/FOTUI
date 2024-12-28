import { Component, Input } from '@angular/core';
import { ProductCard } from '../../../models/product-card-model';
import { CarouselModule } from 'primeng/carousel';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [CarouselModule, ProductCardComponent],
  templateUrl: './products-carousel.component.html',
  styleUrl: './products-carousel.component.scss',
})
export class ProductsCarouselComponent {
  @Input() title: string = '';
  @Input() searchKeywords: string[] = [];
  @Input() loading: boolean = true;

  public products: ProductCard[] = [];
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.fetchProducts();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  private fetchProducts(): void {
    // what this do is fetch products from the server to match searchKeywords
    // right now we are just mocking it

    this.products = [
      {
        id: '1',
        name: 'Fresh Tomatoes',
        price: 100,
        rating: 4.5,
        totalReviews: 100,
        discount: 10,
        image: '/tomatoes.jpg',
        badges: ['fast-delivery', 'best-price'],
      },
      {
        id: '2',
        name: 'Red Apples',
        price: 200,
        rating: 3.2,
        totalReviews: 50,
        discount: 20,
        image: '/tomatoes.jpg',
        badges: ['trending'],
      },
      {
        id: '3',
        name: 'Green Grapes',
        price: 150,
        rating: 4.7,
        totalReviews: 75,
        discount: 15,
        image: '/tomatoes.jpg',
        badges: [],
      },
      {
        id: '4',
        name: 'Bananas',
        price: 5000,
        rating: 4.0,
        totalReviews: 25,
        discount: 5,
        image: '/tomatoes.jpg',
        badges: ['fast-delivery'],
      },
    ];
  }
}
