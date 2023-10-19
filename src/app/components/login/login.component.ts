import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: string = '';
  constructor(private authService: AuthService,
     private router: Router) {}

  onSubmit(loginForm: NgForm) {
    if (this.authService.isValidUser(loginForm.value)) {
      this.router.navigate([''], { replaceUrl: true });
    } else {
      this.error = 'Invalid Credentails!!!';
    }
  }
}
