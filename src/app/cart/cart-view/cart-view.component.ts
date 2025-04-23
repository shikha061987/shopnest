import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';
import { Location } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-cart-view',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss'
})
export class CartViewComponent {
  constructor(public cartService: CartService,private _location: Location) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product.id);
  }
  goback(){
    this._location.back();

  }
}