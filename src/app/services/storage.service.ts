import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  private users: User[] = [
    { id: 1, email: 'ashith@user.com', password: 'ashith' },
    { id: 3, email: 'sk@user.com', password: 'sk28' },
  ];

  loadUsers() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  loadCart() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  getCart(): Cart[] {
    let cart = JSON.parse(localStorage.getItem('cart') as string);
    if (cart === null) cart = [];
    return cart;
  }

  setCart(cart: Cart[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') as string);
  }

  setLoggedInUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('loggedInUser') as string);
  }

  removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  setProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getCachedProducts(): Product[] {
    let cachedProducts: Product[] = JSON.parse(
      localStorage.getItem('products') as string
    );
    if (!cachedProducts) {
      cachedProducts = [];
    }
    return cachedProducts;
  }
}
