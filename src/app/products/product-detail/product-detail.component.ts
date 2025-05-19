import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';
import { ProductServiceTsService } from '../product.service.ts.service';

@Component({
   standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  sizes = ['S', 'M', 'L', 'XL'];
  variantForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceTsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe((data) => {
        this.product = data;
      });
    }

    this.variantForm = this.fb.group({
      size: ['M']
    });
  }

  addToCart() {
    console.log('Add to cart:', {
      productId: this.product.id,
      selectedSize: this.variantForm.value.size
    });
    // Call cartService.addToCart(...) here
  }
}
