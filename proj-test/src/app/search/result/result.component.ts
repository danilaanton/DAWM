import { Component, Input } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() photo : string = '';
  @Input() name : string = '';
  @Input() userID? : string = '';
  isDecidedIfFollowing : boolean = false;
  isFollowing : boolean = false;

  constructor(private searchService : SearchService){}

  ngOnInit(){
    this.searchService.isFollowing(localStorage.getItem('user') as string, '"' + (this.userID as string) + '"').subscribe(res =>{
      if(res){
        this.isFollowing = true;
      }
      this.isDecidedIfFollowing = true
    })
  }
  follow(){
    if(!this.isFollowing){
      this.searchService.followUser(localStorage.getItem('user') as string, '"' + (this.userID as string) + '"').subscribe(res =>{
        this.isFollowing = true;
      });
    }
    else{
      this.searchService.unfollowUser(localStorage.getItem('user') as string, '"' + (this.userID as string) + '"').subscribe(res =>{
        this.isFollowing = false;
      });
    }
  }
}
