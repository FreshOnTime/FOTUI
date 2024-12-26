import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Image } from 'primeng/image';
import { Menu } from 'primeng/menu';
import { Rating } from 'primeng/rating';
import { Skeleton } from 'primeng/skeleton';
import { Ripple } from 'primeng/ripple';
import { QuillModule } from 'ngx-quill';
import { Tag } from 'primeng/tag';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [
    Image,
    Skeleton,
    Rating,
    CommonModule,
    FormsModule,
    Menu,
    Ripple,
    QuillModule,
    Tag,
    ProductReviewsComponent,
  ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
})
export class ProductOverviewComponent {
  public pageLoading: boolean = false;
  public name: string = 'Fresh Tomatoes';
  public rating: number | undefined = 3.4;
  public price: number = 100;
  public image: string = 'assets/images/tomatoes.jpg';
  public shortDescription: string =
    'Tomatoes are the major dietary source of the antioxidant lycopene, which has been linked to many health benefits, including reduced risk of heart disease and cancer.';
  public longDescription: string =
    '<h1><span style="color: rgb(0, 0, 0);">The&nbsp;Health&nbsp;Benefits&nbsp;of&nbsp;Tomatoes</span></h1><p><strong style="color: rgb(0, 0, 0);">Tomatoes</strong><span style="color: rgb(0, 0, 0);">&nbsp;are&nbsp;the&nbsp;major&nbsp;dietary&nbsp;source&nbsp;of&nbsp;the&nbsp;antioxidant&nbsp;lycopene,&nbsp;which&nbsp;has&nbsp;been&nbsp;linked&nbsp;to&nbsp;many&nbsp;health&nbsp;benefits,&nbsp;including&nbsp;reduced&nbsp;risk&nbsp;of&nbsp;heart&nbsp;disease&nbsp;and&nbsp;cancer.&nbsp;They&nbsp;are&nbsp;also&nbsp;a&nbsp;great&nbsp;source&nbsp;of&nbsp;vitamin&nbsp;C,&nbsp;potassium,&nbsp;folate,&nbsp;and&nbsp;vitamin&nbsp;K.</span></p><p></p><h2><span style="color: rgb(230, 0, 0);">Key&nbsp;Nutritional&nbsp;Benefits:</span></h2><p><span style="color: rgb(255, 153, 0);">Lycopene</span><span style="color: rgb(0, 0, 0);">&nbsp;-&nbsp;A&nbsp;powerful&nbsp;antioxidant&nbsp;that&nbsp;gives&nbsp;tomatoes&nbsp;their&nbsp;red&nbsp;color</span></p><ul><li><span style="color: rgb(0, 0, 0);">May&nbsp;help&nbsp;prevent&nbsp;various&nbsp;types&nbsp;of&nbsp;cancer</span></li><li><span style="color: rgb(0, 0, 0);">Supports&nbsp;heart&nbsp;health</span></li></ul><p><span style="color: rgb(0, 102, 204);">Vitamins</span></p><ul><li><span style="color: rgb(0, 0, 0);">Vitamin&nbsp;C&nbsp;-&nbsp;Supports&nbsp;immune&nbsp;system</span></li><li><span style="color: rgb(0, 0, 0);">Vitamin&nbsp;K&nbsp;-&nbsp;Essential&nbsp;for&nbsp;blood&nbsp;clotting</span></li></ul><p><span style="color: rgb(102, 61, 0);">Minerals</span></p><ul><li><span style="color: rgb(0, 0, 0);">Potassium&nbsp;-&nbsp;Helps&nbsp;regulate&nbsp;blood&nbsp;pressure</span></li><li><span style="color: rgb(0, 0, 0);">Folate&nbsp;-&nbsp;Important&nbsp;for&nbsp;cell&nbsp;growth</span></li></ul><p><span style="color: rgb(0, 0, 0);">Ways&nbsp;to&nbsp;Include&nbsp;Tomatoes&nbsp;in&nbsp;Your&nbsp;Diet:</span></p><p><span style="color: rgb(0, 0, 0);">Tomatoes&nbsp;</span><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 0);">can&nbsp;be&nbsp;enjoyed&nbsp;in&nbsp;many&nbsp;forms,&nbsp;including&nbsp;raw,&nbsp;cooked,&nbsp;or&nbsp;as&nbsp;part&nbsp;of&nbsp;various&nbsp;dishes&nbsp;like&nbsp;salads,&nbsp;sauces,&nbsp;and&nbsp;soups.&nbsp;Cooking&nbsp;tomatoes&nbsp;actuall</span><span style="color: rgb(0, 0, 0);">y&nbsp;increases&nbsp;the&nbsp;availability&nbsp;of&nbsp;lycopene.</span></p><p><span style="color: rgb(0, 0, 0);">Did&nbsp;you&nbsp;know?&nbsp;While&nbsp;technically&nbsp;a&nbsp;fruit,&nbsp;tomatoes&nbsp;are&nbsp;generally&nbsp;served&nbsp;and&nbsp;prepared&nbsp;as&nbsp;a&nbsp;vegetable.&nbsp;They&nbsp;were&nbsp;first&nbsp;grown&nbsp;in&nbsp;the&nbsp;Andes&nbsp;mountains&nbsp;and&nbsp;were&nbsp;brought&nbsp;to&nbsp;Europe&nbsp;by&nbsp;Spanish&nbsp;explorers.</span></p><p></p>';

  public reviews: number = 100;
  badges: ('fast-delivery' | 'best-price' | 'trending')[] = [
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
    return `LKR ${this.price.toFixed(2)}`;
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

  public onTextChange(event: any): void {
    console.log(event);
  }
}
