import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  modalVisible : boolean = false;
  showLikers(){
    this.modalVisible = true;
  }
  handleCancel(){
    this.modalVisible = false;
  }
  handleOk(){
    console.log("pressed ok")
    this.modalVisible = false;
  }
}
