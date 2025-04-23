import { Injectable } from '@angular/core';
import { Product } from './services/product.service';

@Injectable({
  providedIn: 'root'
})
export class AddCartbuttonStateService {
 // isButtonDisabled: boolean = false;
 isButtonDisabled: { [productId: number]: boolean } = {};
products: Product[] = [];

disableButton(productId: number) {
  this.isButtonDisabled[productId] = true;
}

enableButton(productId: number) {
  this.isButtonDisabled[productId] = false;
}

constructor() { 

}
}