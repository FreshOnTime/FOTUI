import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  aboutUsText: string = 'Welcome to FreshOnTime! We are dedicated to providing you with the freshest produce delivered on time.';
  missionStatement: string = 'Our mission is to make fresh, high-quality products accessible to everyone, while promoting sustainable and eco-friendly practices.';
  visionStatement: string = 'We envision a world where everyone has access to fresh, healthy food, and where our operations contribute positively to the environment.';
  coreValues: string[] = ['Quality', 'Customer Service', 'Sustainability', 'Innovation', 'Integrity'];
  history: string = 'FreshOnTime was founded in 2023 with a vision to revolutionize the way people access fresh produce. Our journey began with a small team of passionate individuals who believed in the power of fresh, healthy food.';
  team: string = 'Our team is composed of dedicated professionals from diverse backgrounds, all working together to ensure that our customers receive the best products and services.';
  futurePlans: string = 'Looking ahead, we plan to expand our product range, enhance our delivery network, and continue to innovate in the field of sustainable practices.';
}
