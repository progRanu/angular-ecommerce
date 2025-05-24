import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
showCart: boolean = false;

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
