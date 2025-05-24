import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';
import { ProductServiceTsService } from '../product.service.ts.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
   standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, ReactiveFormsModule,ToastComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('toast') toast!: ToastComponent;
  product!: Product;
  sizes = ['S', 'M', 'L', 'XL'];
  variantForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceTsService,
    private fb: FormBuilder,
     private cartService: CartService,
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
  this.cartService.addToCart({
    product: this.product,
    quantity: 1,
    selectedSize: this.variantForm.value.size
  });

  this.toast.show('✅ Item added to cart!');


  }
}
