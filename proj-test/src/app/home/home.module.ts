import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PostComponent } from './post/post.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SearchModule } from '../search/search.module';
import { FriendListComponent } from './friend-list/friend-list.component';
import { UploadModule } from '../upload/upload.module';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    SidenavComponent,
    FriendListComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    SearchModule,
    UploadModule,
    NzModalModule
  ],
  providers: [
    NzModalService
  ]
})
export class HomeModule { }
