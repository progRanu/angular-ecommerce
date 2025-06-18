import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router,
    private location: Location
  ){}
showCart: boolean = false;

  toggleCart() {
    //this.showCart = !this.showCart;
      this.router.navigate(['/cart']);
  }

  reloadPage(){
    this.router.navigate(['']);
  }

  backToHome(){
    this.location.back();
  }
}
