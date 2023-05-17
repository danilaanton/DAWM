import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  modalVisible : boolean = false;
  @Input() base64data : string = '';
  showLikers(){
    this.modalVisible = true;
  }
  handleCancel(){
    this.modalVisible = false;
  }
  handleOk(){
    this.modalVisible = false;
  }
}
