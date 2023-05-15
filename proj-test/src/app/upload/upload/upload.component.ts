import { Component, ElementRef, HostListener, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  description : string = '';
  message : string = 'Drag and drop your photo here';
  frameElem : any;
  droppedImage : string | ArrayBuffer | null = null;
  @ViewChild('frameRef', { static: true }) frameRef!: ElementRef;

  ngAfterViewInit(){
    this.frameElem = this.frameRef.nativeElement as HTMLElement;
    console.log(this.frameElem);
  }
  dragEnter(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.message = "Nice, you can let go now";
    this.frameElem.style.borderColor = '#fff';
  }
  dragLeave(){
    this.message = "Drag and drop your photo here";
    this.frameElem.style.borderColor = '#363636';
  }
  onFileDropped(event: any){
    this.message = "Drag and drop your photo here";
    this.frameElem.style.borderColor = '#363636';
    event.preventDefault();
    event.stopPropagation();
    const files: FileList = event.dataTransfer.files;
    if (files.length > 0) {
      const file: File = files[0]; 
      const reader = new FileReader();
      reader.onload = () => {
        this.droppedImage = reader.result;
        this.frameElem.style.height = '300px';
      };
      reader.readAsDataURL(file);
    }
  }
}
