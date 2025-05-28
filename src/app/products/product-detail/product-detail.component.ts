import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../components/cart/cart.service';
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
  colors = ['Red', 'Blue', 'Black'];
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
      size: ['M'],
       colors: this.fb.array([])
    });
  }
  onColorToggle(event: Event) {
  const input = event.target as HTMLInputElement;
  const color = input.value;
  const checked = input.checked;

  const colorArray = this.variantForm.get('colors') as FormArray;

  if (checked) {
    colorArray.push(this.fb.control(color));
  } else {
    const index = colorArray.controls.findIndex(ctrl => ctrl.value === color);
    if (index >= 0) colorArray.removeAt(index);
  }
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
