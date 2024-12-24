import { Component } from '@angular/core';
import { ProductCardComponent } from '../../product/components/product-card/product-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
