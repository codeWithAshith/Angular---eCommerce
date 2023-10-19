import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { ProductService } from './product.service';
import { StorageService } from './storage.service';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private productService: ProductService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  getCount(): number {
    let cart: Cart[] = this.storageService.getCart();
    let loggedInUser: User = this.authService.getLoggedInUser();

    let userCart: Cart | undefined = cart.find(
      (c) => c.user.id === loggedInUser.id
    );

    let count: number = 0;
    if (userCart) {
      for (let product of userCart.cart) {
        if (product.count) count += product.count;
      }
    }

    return count;
  }

  addToCart(productId: number, operation: string): void {
    let cart: Cart[] = this.storageService.getCart();
    let loggedInUser: User = this.authService.getLoggedInUser();
    let products: Product[] = this.productService.getLocalProducts();

    let product: Product | undefined = products.find((p) => p.id === productId);

    if (product) {
      let userCart: Cart | undefined = cart.find(
        (c) => c.user.id === loggedInUser.id
      );

      console.log(userCart);

      if (userCart) {
        let productExists: Product | undefined = userCart?.cart.find(
          (p) => p.id === productId
        );

        if (productExists) {
          let newCart: Product[] = [];
          for (let product of userCart?.cart!) {
            if (product.id === productId) {
              if (operation === '+')
                newCart.push({ ...product, count: product.count! + 1 });
              else newCart.push({ ...product, count: product.count! - 1 });
            } else {
              newCart.push(product);
            }
          }
          userCart.cart = newCart;
        } else {
          userCart?.cart.push({ ...product, count: 1 });
        }

        let updatedCart: Cart[] = cart.filter(
          (c) => c.user.id !== loggedInUser.id
        );
        updatedCart.push(userCart);
        this.storageService.setCart(updatedCart);
      } else {
        let newCart: Cart = {
          user: loggedInUser,
          cart: [{ ...product, count: 1 }],
        };
        cart.push(newCart);
        this.storageService.setCart(cart);
      }
    }
  }

  getUserCart(): Product[] {
    let loggedInUser: User = this.storageService.getLoggedInUser();
    let cart: Cart[] = this.storageService.getCart();

    let userCart: Product[] | undefined = cart.find(
      (c) => c.user.id === loggedInUser.id
    )?.cart;

    if (!userCart) userCart = [];
    return userCart;
  }

  getTotal(): number {
    let userCart = this.getUserCart();
    return userCart.reduce((acc, curr) => {
      acc += curr.count! * parseInt(curr.price)!;
      return acc;
    }, 0);
  }

  checkout(): void {
    let loggedInUser: User = this.storageService.getLoggedInUser();
    let cart: Cart[] = this.storageService.getCart();

    this.storageService.setCart(
      cart.filter((c) => c.user.id !== loggedInUser.id)
    );
  }

  getProductCartCount(id: number): number {
    let cart = this.storageService.getCart();
    let user = this.authService.getLoggedInUser();

    let userCart: Product[] | undefined = cart.find(
      (c) => c.user.id === user.id
    )?.cart;

    let count: number = 0;
    if (userCart) {
      if (userCart.find((cart) => cart.id === id))
        count = userCart.find((cart) => cart.id === id)?.count!;
    }

    console.log(`id => ${count}`);

    return count;
  }
}

//custom directives
//FormBuilder
//Http Post

//canActivate child guard
//canDeactivate guard
//modules
