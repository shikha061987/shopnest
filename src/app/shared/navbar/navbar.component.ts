import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-navbar',

  imports: [ MatToolbarModule,RouterLink,MatBadgeModule,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public cartService: CartService,private router: Router) {}
  
  goToCart(): void {
    this.router.navigate(['/cart']); // Navigate to your cart route
  }
}