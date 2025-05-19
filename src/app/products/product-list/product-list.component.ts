import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../product.model';
import { ProductServiceTsService } from '../product.service.ts.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortBy: string = '';

  constructor(private productService: ProductServiceTsService,private router: Router) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  sortProducts() {
    if (this.sortBy === 'low') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'high') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  goToProduct(id?:number){
    this.router.navigate(['/product', id]);
  }
}
