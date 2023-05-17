import { Component, EventEmitter, Output } from '@angular/core';
import { ImageCrudService } from 'src/app/image/services/image-crud.service';
import { UserCrudService } from 'src/app/user/services/user-crud.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent {
  follows : any = [];
  @Output() myEvent = new EventEmitter<string>();
  constructor(private userService : UserCrudService, private imageService : ImageCrudService){
    this.userService.getAllUsers().subscribe(res => {
      for(let id in res){
        this.userService.isFollowing(localStorage.getItem('user') as string,'"' + id + '"').subscribe(confirm => {
          if(confirm){
            let user = {username : res[id].name, photo : 'none', id : id};
            this.follows.push(user);
            let index = this.follows.length - 1;
            console.log()
            this.imageService.getImage('"' + res[id].avatarID + '"' || 'none').subscribe(metadata =>{
              if(metadata){
                this.imageService.getData('"' + metadata.dataID + '"').subscribe(data =>{
                  this.follows[index].photo = data.base64Data;
                })
              }
            })
          }
        })
      }
    })
  }

  filterByUser(index : number){
    this.myEvent.emit(this.follows[index].id);
  }
}
