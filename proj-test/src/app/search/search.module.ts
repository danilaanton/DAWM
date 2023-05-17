import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component'; 
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ResultComponent } from './result/result.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    FormsModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
