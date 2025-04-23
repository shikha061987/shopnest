import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,

  imports: [FormsModule, InfiniteScrollDirective, CommonModule, MatBadgeModule, MatIconModule, NavbarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  //https://fakestoreapi.com/products
  searchTerm: string = '';

  products: Product[] = [];
  filterProducts: Product[] = [];
  messageVisible: boolean = false;

  isZoomed: boolean = false;
  zoomedImage: string | null = null; // Stores the zoomed image

  toggleZoom(imageUrl?: string): void {

    this.zoomedImage = imageUrl || null;
    console.log("After this.isZoomed " + this.zoomedImage);
    console.log("URL isZoomed " + imageUrl);
  }

 /* Message Loading code here*/ 
 items: string[] = [];
 totalProductDisplay = 0;
 productLimit = 10;
 isLoading = false;
 allLoaded = false;

  constructor(private productService: ProductService, public _cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getAllData();
    this.loadItems();

  }
  getAllData(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filterProducts= data.slice(0,this.productLimit);
      this.totalProductDisplay = this.productLimit;
      isZoomed: false
      return;

    });
  }

  
 loadItems() {
  const newProductList: Product[] = this.products.slice(this.totalProductDisplay, this.productLimit+ this.totalProductDisplay);
  this.totalProductDisplay += this.productLimit;
  this.filterProducts =[...this.filterProducts, ...newProductList]
 
}
  removeFromCart(product: Product) {
    this._cartService.removeFromCart(product.id);

  }
  filterByCategory() {


    if (this.searchTerm === '') {
      // If search term is empty, show all products
      this.getAllData();
    } else {
      const term = this.searchTerm.toLowerCase();
      this.products = this.products.filter(product =>
        product.category.toLowerCase().includes(term)
      );
    }
  }
 /*
  onScroll(): void {
    const newItems = Array.from({ length: 20 }, (_, i) => `Item #${this.items.length + i}`);
    this.items.push(...newItems);
  }*/
  isDisabled(productId: number): boolean {
    return !!this._cartService.cartList.find(cart => cart.id === productId);
  }
  addToCart(product: Product) {
    this._cartService.addToCart(product);
    this.messageVisible = true;
    setTimeout(() => {
      this.messageVisible = false;
    }, 1000); // 1 minute
  }
  onViewDetails(value: number) {

    this.router.navigate(['/details', value]);
  }
  onViewCart() {
    this.router.navigate(['/cart']);

  }
}
