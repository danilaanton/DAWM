import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { StylingService } from '../services/styling.service';
import { ImageCrudService } from 'src/app/image/services/image-crud.service';
import { ImageMetadata } from 'src/app/image/models/image-metadata.interface';
import { ImageData } from 'src/app/image/models/image-data';
import { UserCrudService } from 'src/app/user/services/user-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isCollapsed : boolean = false;
  atLeftMargin : boolean = false;
  uploadOpen : boolean = false;
  canLoadMore : boolean = false;
  imageMetadata : ImageMetadata[] = [];
  loadedImages : ImageData[] = [];
  containerElement : any = null;

  constructor(private stylingService : StylingService, private imageCrud : ImageCrudService, private userService : UserCrudService){ }

  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef;
  ngAfterViewInit(){
    this.containerElement = this.containerRef.nativeElement as HTMLElement;
    this.atLeftMargin = this.stylingService.stylePosts(this.containerElement);
    this.imageCrud.getAllMetadata().subscribe(res =>{
      if(!res){
        this.canLoadMore = false;
      }else{
        for(let id in res){
          console.log(localStorage.getItem('user') as string);
          console.log(res[id].author);
          this.userService.isFollowing(localStorage.getItem('user') as string, res[id].author as string).subscribe(confirm => {
            console.log(confirm);
            if(confirm){
              this.imageMetadata.push(res[id] as ImageMetadata);
              if(this.imageMetadata.length == 1){
                this.loadBatch();
              }else{
                this.canLoadMore = true;
              }
            }
          })
        }
      }
    })
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.atLeftMargin = this.stylingService.stylePosts(this.containerElement);
  }

  uploadPressed(){
    this.uploadOpen = true;
  }

  loadBatch(){
    let targetIndex = this.loadedImages.length + 2;
    for(let i=this.loadedImages.length; i<Math.min(this.imageMetadata.length, targetIndex); i++){
      this.loadedImages.push({ base64Data : 'none', description : '', username : 'loading'});
      this.imageCrud.getData(this.imageMetadata[i].dataID).subscribe(res =>{
          this.loadedImages[i].base64Data = res.base64Data;
          this.loadedImages[i].description = res.description;
      });
      this.userService.getUser(this.imageMetadata[i].author.substring(1, this.imageMetadata[i].author.length - 1)).subscribe(res =>{
        this.loadedImages[i].username = res.name;
        this.imageCrud.getImage(res.avatarID).subscribe(metadata => {
          this.imageCrud.getData(metadata.dataID).subscribe(data => {
            this.loadedImages[i].profilePhoto = data.base64Data;
          }) 
        })
      })
    }
    if(this.loadedImages.length == this.imageMetadata.length){
      this.canLoadMore = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
onScroll(event: Event) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
   if(pos > max - 30)   {
    this.loadBatch();
   }
  }
}
