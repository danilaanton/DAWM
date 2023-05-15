import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserAuthService } from 'src/app/user/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  error: string = '';

  constructor(
    private userAuthService: UserAuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    const item = localStorage.getItem('authErrorMessage');
    if (item) {
      this.error = item;
      localStorage.removeItem('authErrorMessage');
    }
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.userAuthService
        .SignIn(email, password)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
