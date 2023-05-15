import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './authentification/register/register.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent },
  {path : 'register', component : RegisterComponent },
  {path : 'home', component : HomeComponent },
  {path: '', redirectTo: 'login', pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
