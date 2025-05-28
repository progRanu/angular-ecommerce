import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];

