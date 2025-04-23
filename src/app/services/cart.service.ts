import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(){
    this.loadCart();
  }
  cartList$ = new BehaviorSubject<Product[]>([]);
 
  loadCart(){
    const cart= sessionStorage.getItem("shoppingCart");
    if(!!cart) {
      this.cartList$.next(JSON.parse(cart));
    }
  }
  addToCart(product: Product) {
    if (!this.cartList$.value.find(p => p.id === product.id)) {
      this.cartList$.next([...this.cartList$.value, product]);
      sessionStorage.setItem("shoppingCart", JSON.stringify(this.cartList$.value));

    }
  }

  removeFromCart(productId: number) { 
    const cart= this.cartList$.value.filter(p => p.id !== productId);
    this.cartList$.next(cart);
    sessionStorage.setItem("shoppingCart", JSON.stringify(this.cartList$.value));

  }
  get cartList(): Product[] {
    return this.cartList$.value;
  }

}