import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { User } from 'src/app/user/models/user.interface';
import { ImageCrudService } from 'src/app/image/services/image-crud.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  results : User[] = [];
  searchTerm : string = '';

  constructor(private searchService : SearchService, private imageService : ImageCrudService){}

  search(){
    if(this.searchTerm == ''){
      this.results = [];
      return
    }
    this.searchService.searchUsersByTerm(this.searchTerm).subscribe(res =>{
      for(let user of res){
        if(user.avatarID){
          this.imageService.getData(user.avatarID).subscribe(data =>{
            user.photo = data.base64Data;
          })
        }
      }
      this.results = res;
    });
  }
}
