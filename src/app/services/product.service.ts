import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
//import { ReturnStatement } from '@angular/compiler';
import { delay } from 'rxjs/operators';


export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://fakestoreapi.com/products';
  private allItems = Array.from({ length: 30 }).map((_, i) => `Item #${i + 1}`);


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product | undefined> {

    return this.getProducts().pipe(map(products => products.find(product => product.id == id)));

  }

  getItems(page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = this.allItems.slice(start, end);
    return of(pageItems).pipe(delay(500)); // Simulate network delay
  }

}

