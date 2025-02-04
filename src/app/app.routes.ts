import { Routes } from '@angular/router';
import { SignInComponent } from './features/login/pages/sign-in/sign-in.component';
import { SignUpComponent } from './features/login/pages/sign-up/sign-up.component';
import { loggedOutGuard } from './features/login/guards/logged-out.guard';
import { VerifyEmailComponent } from './features/login/pages/verify-email/verify-email.component';
import { generalGuardGuard } from './shared/guards/general-guard.guard';
import { verifyEmailPageGuardGuard } from './features/login/guards/verify-email-page-guard.guard';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { SearchResultsComponent } from './features/search-results/search-results.component';
import { ProductOverviewComponent } from './features/product/product-overview/product-overview.component';
import { UserInfoComponent } from './features/user-info/user-info.component';
import { ViewBagComponent } from './features/bags/view-bag/view-bag.component';
import { CheckoutComponent } from './features/order/checkout/checkout.component';
import { checkoutGuard } from './features/order/checkout/guard/checkout.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [generalGuardGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [loggedOutGuard, generalGuardGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [loggedOutGuard, generalGuardGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [verifyEmailPageGuardGuard],
  },
  {
    path: 'search/:query',
    component: SearchResultsComponent,
  },
  {
    path: 'products/:id',
    component: ProductOverviewComponent,
  },
  {
    path: 'bags/:id',
    component: ViewBagComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [generalGuardGuard, checkoutGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
