import { CartItem } from './cart.model';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems$!: Observable<CartItem[]>;
  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cart$;
  }
  getTotal(items: CartItem[] | null): number {
    if (!items) return 0;
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  updateQuantity(item: CartItem, change: number) {
    this.cartService.updateQuantity(item, change);
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
