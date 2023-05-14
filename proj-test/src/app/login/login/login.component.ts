import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/user/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private userAuthService: UserAuthService) { }

  // ngOnInit(): void {
  //   this.initializeForm();
  // }

  // initializeForm(): void {
  //   this.loginForm = new FormGroup({
  //     email: new FormControl('',Validators.required),
  //     password: new FormControl('',Validators.required)
  //   });
  // }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const email = this.loginForm.value.email;
  //     const password = this.loginForm.value.password;
  //     this.userAuthService.SignIn(email, password);
  //   }
  // }

}