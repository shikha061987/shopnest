import { Component } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productDetails: Product | undefined;

  isAddCartButtonDisabled: { [key: number]: boolean } = {};
  messageVisible: boolean = false;

  constructor(private _productService: ProductService,private _route: ActivatedRoute , private _location: Location,private _cartService: CartService) {}

  ngOnInit(): void {
    
    this._productService.getProductById(this._route.snapshot.params['id']).subscribe(res => {

      this.productDetails = res;
    })
    console.log("this.productDetails" +this.productDetails);

  }
  isDisabled(productId: number): boolean {
    return !!this._cartService.cartList.find(cart=> cart.id === productId);
  }
  goback() {
    this._location.back();
  }
  addToCart(product: any) {
    
    if (this.isAddCartButtonDisabled[product.id]) {
      console.log('Button already disabled for this product:', product.id);
      return;
    }
    this.isAddCartButtonDisabled[product.id] = true;
    this._cartService.addToCart(product);

   
    

    this.messageVisible = true;

    // Hide the message after 1 minute (60,000 ms)
    setTimeout(() => {
      this.messageVisible = false;
    }, 1000); // 1 minute
  
  }

  isAddCartDisabled(productId: number | undefined): boolean {
    return productId !== undefined ? !!this.isAddCartButtonDisabled[productId] : true;
  }
}