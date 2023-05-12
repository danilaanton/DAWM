import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NzButtonModule } from 'ng-zorro-antd/button'; 
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzInputModule
  ]
})
export class LoginModule { }
