import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  regForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', []),
    repeatPassword: new FormControl('', []),
  });

  // get email() {
  //   return this.regForm.get('email');
  // }

  onSubmit() {
    console.log(this.regForm);
  }
}
// {email:"asa" ,group{pass}}