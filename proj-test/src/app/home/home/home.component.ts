import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { StylingService } from '../services/styling.service';
import { ImageCrudService } from 'src/app/image/services/image-crud.service';
import { ULikesCrudService } from 'src/app/user/services/likes-crud.service';
import { ImageMetadata } from 'src/app/image/models/image-metadata.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isCollapsed : boolean = false;
  atLeftMargin : boolean = false;
  uploadOpen : boolean = false;
  cards : ImageMetadata[] = [];
  containerElement : any = null;

  constructor(private stylingService : StylingService, private imageCrud : ImageCrudService, private likesCrud : ULikesCrudService){ 
    imageCrud.getAllMetadata().subscribe(res =>{
      console.log(res);
    })
  }

  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef;
  ngAfterViewInit(){
    this.containerElement = this.containerRef.nativeElement as HTMLElement;
    this.atLeftMargin = this.stylingService.stylePosts(this.containerElement);
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.atLeftMargin = this.stylingService.stylePosts(this.containerElement);
  }

  uploadPressed(){
    this.uploadOpen = true;
  }
}
