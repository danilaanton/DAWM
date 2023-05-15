import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NzButtonModule } from 'ng-zorro-antd/button'; 
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthentificationModule { }
