import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component'; 
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ResultComponent } from './result/result.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    SearchComponent,
    ResultComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchComponent,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule
  ]
})
export class SearchModule { }
