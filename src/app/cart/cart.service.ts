import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartItem } from './cart.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  //.asObservable(), we're hiding the ability to emit from outside the service — only the service can push changes.
  //Because it allows components to reactively subscribe to cart changes like this
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    //This constructor block reserve the hydration logic — it makes sure the cart is restored from localStorage the moment the service is instantiated
    //Cart state is persistent
     const stored = localStorage.getItem('cart');
    if (stored) {
      this.cartItems = JSON.parse(stored);
      this.cartSubject.next(this.cartItems);
    }
  }


  addToCart(item: CartItem) {
    const existing = this.cartItems.find(
      i => i.product.id === item.product.id && i.selectedSize === item.selectedSize
    );

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }

    this.cartSubject.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }
}
