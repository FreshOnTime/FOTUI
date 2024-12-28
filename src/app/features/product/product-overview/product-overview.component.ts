import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Image } from 'primeng/image';
import { Menu } from 'primeng/menu';
import { Rating } from 'primeng/rating';
import { Skeleton } from 'primeng/skeleton';
import { Ripple } from 'primeng/ripple';
import { QuillModule } from 'ngx-quill';
import { Tag } from 'primeng/tag';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { ProductsCarouselComponent } from '../products-carousel/products-carousel.component';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [
    Image,
    Skeleton,
    CommonModule,
    FormsModule,
    Menu,
    Ripple,
    QuillModule,
    Tag,
    ProductReviewsComponent,
    ProductsCarouselComponent,
    ReactiveFormsModule,
    InputNumber,
  ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
})
export class ProductOverviewComponent {
  public pageLoading: boolean = false;
  public name: string = 'Fresh Tomatoes';
  public rating: number | undefined = 3.4;
  public id: string = '1';
  private baseUnitAmount: number = 1000;
  private pricePerUnit: number = 25000;
  public measurementUnit: string = 'unit';
  public minimumAmount: number = 500;
  public maximumAmount: number = 10000;
  public incrementStep: number = 50;

  public image: string = 'assets/images/tomatoes.jpg';
  public shortDescription: string =
    'Tomatoes are the major dietary source of the antioxidant lycopene, which has been linked to many health benefits, including reduced risk of heart disease and cancer.';
  public longDescription: string =
    '<h1><span style="color: rgb(0, 0, 0);">The&nbsp;Health&nbsp;Benefits&nbsp;of&nbsp;Tomatoes</span></h1><p><strong style="color: rgb(0, 0, 0);">Tomatoes</strong><span style="color: rgb(0, 0, 0);">&nbsp;are&nbsp;the&nbsp;major&nbsp;dietary&nbsp;source&nbsp;of&nbsp;the&nbsp;antioxidant&nbsp;lycopene,&nbsp;which&nbsp;has&nbsp;been&nbsp;linked&nbsp;to&nbsp;many&nbsp;health&nbsp;benefits,&nbsp;including&nbsp;reduced&nbsp;risk&nbsp;of&nbsp;heart&nbsp;disease&nbsp;and&nbsp;cancer.&nbsp;They&nbsp;are&nbsp;also&nbsp;a&nbsp;great&nbsp;source&nbsp;of&nbsp;vitamin&nbsp;C,&nbsp;potassium,&nbsp;folate,&nbsp;and&nbsp;vitamin&nbsp;K.</span></p><p></p><h2><span style="color: rgb(230, 0, 0);">Key&nbsp;Nutritional&nbsp;Benefits:</span></h2><p><span style="color: rgb(255, 153, 0);">Lycopene</span><span style="color: rgb(0, 0, 0);">&nbsp;-&nbsp;A&nbsp;powerful&nbsp;antioxidant&nbsp;that&nbsp;gives&nbsp;tomatoes&nbsp;their&nbsp;red&nbsp;color</span></p><ul><li><span style="color: rgb(0, 0, 0);">May&nbsp;help&nbsp;prevent&nbsp;various&nbsp;types&nbsp;of&nbsp;cancer</span></li><li><span style="color: rgb(0, 0, 0);">Supports&nbsp;heart&nbsp;health</span></li></ul><p><span style="color: rgb(0, 102, 204);">Vitamins</span></p><ul><li><span style="color: rgb(0, 0, 0);">Vitamin&nbsp;C&nbsp;-&nbsp;Supports&nbsp;immune&nbsp;system</span></li><li><span style="color: rgb(0, 0, 0);">Vitamin&nbsp;K&nbsp;-&nbsp;Essential&nbsp;for&nbsp;blood&nbsp;clotting</span></li></ul><p><span style="color: rgb(102, 61, 0);">Minerals</span></p><ul><li><span style="color: rgb(0, 0, 0);">Potassium&nbsp;-&nbsp;Helps&nbsp;regulate&nbsp;blood&nbsp;pressure</span></li><li><span style="color: rgb(0, 0, 0);">Folate&nbsp;-&nbsp;Important&nbsp;for&nbsp;cell&nbsp;growth</span></li></ul><p><span style="color: rgb(0, 0, 0);">Ways&nbsp;to&nbsp;Include&nbsp;Tomatoes&nbsp;in&nbsp;Your&nbsp;Diet:</span></p><p><span style="color: rgb(0, 0, 0);">Tomatoes&nbsp;</span><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 0);">can&nbsp;be&nbsp;enjoyed&nbsp;in&nbsp;many&nbsp;forms,&nbsp;including&nbsp;raw,&nbsp;cooked,&nbsp;or&nbsp;as&nbsp;part&nbsp;of&nbsp;various&nbsp;dishes&nbsp;like&nbsp;salads,&nbsp;sauces,&nbsp;and&nbsp;soups.&nbsp;Cooking&nbsp;tomatoes&nbsp;actuall</span><span style="color: rgb(0, 0, 0);">y&nbsp;increases&nbsp;the&nbsp;availability&nbsp;of&nbsp;lycopene.</span></p><p><span style="color: rgb(0, 0, 0);">Did&nbsp;you&nbsp;know?&nbsp;While&nbsp;technically&nbsp;a&nbsp;fruit,&nbsp;tomatoes&nbsp;are&nbsp;generally&nbsp;served&nbsp;and&nbsp;prepared&nbsp;as&nbsp;a&nbsp;vegetable.&nbsp;They&nbsp;were&nbsp;first&nbsp;grown&nbsp;in&nbsp;the&nbsp;Andes&nbsp;mountains&nbsp;and&nbsp;were&nbsp;brought&nbsp;to&nbsp;Europe&nbsp;by&nbsp;Spanish&nbsp;explorers.</span></p><p></p>';

  public reviews: number = 100;
  public badges: ('fast-delivery' | 'best-price' | 'trending')[] = [
    'fast-delivery',
    'best-price',
  ];
  public discount: number = 10;

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
    const price = this.pricePerUnit * (this.buyingAmount / this.baseUnitAmount);
    const totalPrice = price - (price * this.discount) / 100;
    return `LKR ${totalPrice.toFixed(2)}`;
  }

  public getPriceWithoutDiscount(): string {
    const price = this.pricePerUnit * (this.buyingAmount / this.baseUnitAmount);
    return `LKR ${price.toFixed(2)}`;
  }

  public getPerUnit(): string {
    let amount = this.buyingAmount;
    let unit = this.measurementUnit;

    if (this.measurementUnit === 'unit') {
      return amount === 1 ? '1pc' : `${amount}pcs`;
    }

    if (unit === 'g' && amount >= 1000) {
      amount = amount / 1000;
      unit = 'kg';
    }

    if (unit === 'ml' && amount >= 1000) {
      amount = amount / 1000;
      unit = 'L';
    }

    if (unit === 'L' && amount < 1) {
      amount = amount * 1000;
      unit = 'ml';
    }

    if (unit === 'kg' && amount < 1) {
      amount = amount * 1000;
      unit = 'g';
    }

    return `${amount}${unit}`;
  }

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

  buyingAmountControl = new FormControl(this.baseUnitAmount, [
    Validators.required,
    Validators.min(this.minimumAmount),
    Validators.max(this.maximumAmount),
    this.stepValidator.bind(this),
  ]);

  get buyingAmount(): number {
    return this.buyingAmountControl.value || this.baseUnitAmount;
  }

  stepValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (value === null || value === undefined) return null;

    const isValidStep = (value - this.minimumAmount) % this.incrementStep === 0;
    return isValidStep ? null : { step: true };
  }

  validateAndAdjustAmount(): void {
    const currentValue = this.buyingAmount;

    if (currentValue < this.minimumAmount) {
      this.buyingAmountControl.setValue(this.minimumAmount);
      return;
    }

    if (currentValue > this.maximumAmount) {
      this.buyingAmountControl.setValue(this.maximumAmount);
      return;
    }

    // Round to nearest valid step
    const steps = Math.round(
      (currentValue - this.minimumAmount) / this.incrementStep
    );
    const adjustedValue = this.minimumAmount + steps * this.incrementStep;

    if (adjustedValue !== currentValue) {
      this.buyingAmountControl.setValue(adjustedValue);
    }
  }
}
