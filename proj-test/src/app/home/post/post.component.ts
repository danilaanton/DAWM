import { Component, Input } from '@angular/core';
import { ImageCrudService } from 'src/app/image/services/image-crud.service';
import { UserCrudService } from 'src/app/user/services/user-crud.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  modalVisible : boolean = false;
  @Input() base64data : string = '';
  @Input() username : string = '';
  @Input() description : string = '';
  @Input() profilePhoto : string = 'none';
  @Input() liked : boolean = false;
  @Input() id : string = '';
  likes : number = 0;
  likers : string[] = [];
  constructor(private imageService : ImageCrudService, private userService : UserCrudService){
    
  }
  ngOnInit(){
    console.log(this.id);
    this.imageService.getLikes(this.id).subscribe(likes => {
      if(likes){
        for(let id in likes){ 
          this.likes++;
          if(id == (localStorage.getItem('user') as string)){
            this.liked = true;
          }
          this.userService.getUser(id.substring(1, id.length - 1)).subscribe(user => {
            this.likers.push(user.name);
          })
        }
      }
    })
  }
  showLikers(){
    this.modalVisible = true;
  }
  handleCancel(){
    this.modalVisible = false;
  }
  handleOk(){
    this.modalVisible = false;
  }
  likePressed(){
    if(this.liked){
      this.imageService.dislikePhoto(localStorage.getItem('user') as string, this.id).subscribe();
      this.likes--;
    }else{
      this.imageService.likePhoto(localStorage.getItem('user') as string, this.id).subscribe();
      this.likes++;
    }
    this.liked = !this.liked;
  }
  download(){
    this.imageService.addDownload(this.id);
  }
}
