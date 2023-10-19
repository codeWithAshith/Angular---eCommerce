import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  saveProductCache(products: Product[]) {
    this.storageService.setProducts(products);
  }

  getLocalProducts(): Product[] {
    return this.storageService.getCachedProducts();
  }

  getCachedProducts(): Observable<Product[]> {
    let cachedProducts: Product[] = this.storageService.getCachedProducts();

    return new Observable((observer) => {
      if (cachedProducts.length > 0) {
        observer.next(this.storageService.getCachedProducts());
      }
      this.getAllProducts().subscribe({
        next: (products: Product[]) => {
          // check cachedProducts
          let hasChanged: boolean =
            cachedProducts.length !== products.length &&
            !cachedProducts.every(
              (p, i) => p.id === products[i].id && p.price === products[i].price
            );

          // if cachedProducts are different
          if (!hasChanged) {
            observer.next(products);
            this.storageService.setProducts(products);
          }
        },
        complete: () => {
          observer.complete();
        },
        error: (error: Error) => {
          observer.error(error);
        },
      });
    });

    // return this.storageService.getCachedProducts();
  }
}
