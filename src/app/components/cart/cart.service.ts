import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cart.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();
 constructor() {
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
  updateQuantity(item: CartItem, change: number) {
  const target = this.cartItems.find(i => i.product.id === item.product.id && i.selectedSize === item.selectedSize);
  if (target) {
    target.quantity += change;
    if (target.quantity <= 0) {
      this.removeItem(item);
    } else {
      this.saveCart();
    }
  }
}

removeItem(item: CartItem) {
  this.cartItems = this.cartItems.filter(i => !(i.product.id === item.product.id && i.selectedSize === item.selectedSize));
  this.saveCart();
}

private saveCart() {
  this.cartSubject.next(this.cartItems);
  localStorage.setItem('cart', JSON.stringify(this.cartItems));
}
}
