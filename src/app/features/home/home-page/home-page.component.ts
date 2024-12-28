import { Component } from '@angular/core';
import { ProductCardComponent } from '../../product/product-card/product-card.component';

import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { ProductsCarouselComponent } from '../../product/products-carousel/products-carousel.component';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductsCarouselComponent, CarouselModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
