import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PostComponent } from './post/post.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    SearchModule
  ]
})
export class HomeModule { }
