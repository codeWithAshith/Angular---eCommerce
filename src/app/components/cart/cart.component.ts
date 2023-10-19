import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  ngOnInit(): void {
    this.cartProducts = this.cartService.getUserCart();
    console.log(this.cartProducts);
  }

  isCartAvailable(): boolean {
    return this.cartService.getCount() > 0;
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout(): void {
    this.cartService.checkout();
    this.router.navigate(['']);
  }
}
