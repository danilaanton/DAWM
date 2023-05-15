import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    NzButtonModule
  ],
  exports: [
    UploadComponent
  ]
})
export class UploadModule { }
