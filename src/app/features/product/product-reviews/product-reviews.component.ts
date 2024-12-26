import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { Ripple } from 'primeng/ripple';
import { ProgressBar } from 'primeng/progressbar';
import { ProductReview } from '../../../models/product-review-model';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [Rating, CommonModule, FormsModule, Ripple, ProgressBar],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss',
})
export class ProductReviewsComponent {
  @Input() productId: string = '';
  public rating: number = 3;
  public totalReviews: number = 0;
  @Input() fiveStar: number = 67;
  @Input() fourStar: number = 23;
  @Input() threeStar: number = 34;
  @Input() twoStar: number = 2;
  @Input() oneStar: number = 5;

  public reviews: ProductReview[] = [
    {
      rating: 5,
      review: 'Great product! Would buy again.',
      reviewer: 'Bhanuka Dassanayake',
      date: new Date('2021-07-01'),
      verified: true,
    },
    {
      rating: 4,
      review: 'Good product. Fast delivery.',
      reviewer: 'Jane Doe',
      date: new Date('2021-07-02'),
      verified: true,
    },
    {
      rating: 3,
      review: 'Average product. Could be better.',
      reviewer: 'John Smith',
      date: new Date('2021-07-03'),
      verified: true,
    },
    {
      rating: 2,
      review: 'Not great. Would not recommend.',
      reviewer: 'Jane Smith',
      date: new Date('2021-07-04'),
      verified: true,
    },
    {
      rating: 1,
      review: 'Terrible product. Avoid at all costs.',
      reviewer: 'John Doe',
      date: new Date('2021-07-05'),
      verified: true,
    },
    // Add more reviews for testing
    {
      rating: 5,
      review: 'Excellent, better than expected.',
      reviewer: 'Alice Wonderland',
      date: new Date('2021-07-06'),
      verified: true,
    },
    {
      rating: 4,
      review: 'Pretty good, satisfied with the purchase.',
      reviewer: 'Bob Marley',
      date: new Date('2021-07-07'),
      verified: true,
    },
  ];

  public reviewsToShow: number = 3; // Initially show 3 reviews
  public isViewMoreVisible: boolean = true; // Controls visibility of "View More" button

  ngOnInit() {
    this.totalReviews = this.calculateTotalReviews();
    this.rating = this.calculateRating();
    this.checkViewMoreButtonVisibility();
  }

  public calculateTotalReviews(): number {
    return (
      this.fiveStar +
      this.fourStar +
      this.threeStar +
      this.twoStar +
      this.oneStar
    );
  }

  public calculateRating(): number {
    const totalStars =
      this.fiveStar * 5 +
      this.fourStar * 4 +
      this.threeStar * 3 +
      this.twoStar * 2 +
      this.oneStar;

    return Math.round((totalStars / this.totalReviews) * 10) / 10;
  }

  public showMoreReviews(): void {
    this.reviewsToShow += 3; // Show 3 more reviews
    this.checkViewMoreButtonVisibility();
  }

  public checkViewMoreButtonVisibility(): void {
    if (this.reviewsToShow >= this.reviews.length) {
      this.isViewMoreVisible = false;
    }
  }
}
