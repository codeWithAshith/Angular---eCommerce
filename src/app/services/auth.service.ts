import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  isValidUser(user: User): boolean {
    let users: User[] = this.storageService.getAllUsers();
    let isUser: boolean = false;
    for (let u of users) {
      if (u.email === user.email && u.password === user.password) {
        this.storageService.setLoggedInUser(u);
        isUser = true;
        break;
      }
    }
    return isUser;
  }

  isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }

  logout(): void {
    this.storageService.removeLoggedInUser();
  }

  getLoggedInUser(): User {
    return this.storageService.getLoggedInUser();
  }
}
