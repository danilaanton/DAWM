import { Component, Input } from '@angular/core';
import { ImageCrudService } from 'src/app/image/services/image-crud.service';

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
  constructor(private imageService : ImageCrudService){
    
  }
  ngOnInit(){
    console.log(this.id);
    this.imageService.getLikes(this.id).subscribe(res => {
      console.log(res);
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
}
