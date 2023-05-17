import { Component } from '@angular/core';
import { ImageCrudService } from '../image/services/image-crud.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  images : any = [];
  constructor(private imageService : ImageCrudService){
    imageService.getAll().subscribe(res => {
      console.log(res);
    })
  }
}
