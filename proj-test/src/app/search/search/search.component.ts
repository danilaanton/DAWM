import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { User } from 'src/app/user/models/user.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  results : User[] = [];
  searchTerm : string = '';

  constructor(private searchService : SearchService){}

  search(){
    if(this.searchTerm == ''){
      this.results = [];
      return
    }
    this.searchService.searchUsersByTerm(this.searchTerm).subscribe(res =>{
      for(let user of res){
        if(user.avatarID){
          //TODO
        }
      }
      this.results = res;
    });
  }
}
