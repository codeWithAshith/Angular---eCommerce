import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  pageSize: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getCachedProducts().subscribe({
      next: (data: Product[]) => {
        this.productService.saveProductCache(data);
        this.changePage(1);
      },
      complete: () => {},
      error: (error: Error) => {},
    });
  }

  addToCart(id: number, operation: string = '+'): void {
    this.cartService.addToCart(id, operation);
  }

  changePage(pageNumber: number) {
    this.pageSize = pageNumber;
    let localProducts: Product[] = this.productService.getLocalProducts();
    let startIndex = (pageNumber - 1) * 6;
    let endIndex = startIndex + 6;
    this.products = localProducts.slice(startIndex, endIndex);
  }

  showDetails(id: number): void {
    this.router.navigate(['/product', id]);
  }

  getProductCartCount(id: number): number {
    return this.cartService.getProductCartCount(id);
  }
}
