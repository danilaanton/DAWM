import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { StylingService } from '../services/styling.service';
import { ImageCrudService } from 'src/app/image/services/image-crud.service';
import { ImageMetadata } from 'src/app/image/models/image-metadata.interface';
import { ImageData } from 'src/app/image/models/image-data';
import { UserCrudService } from 'src/app/user/services/user-crud.service';
import { UserAuthService } from 'src/app/user/services/user-auth.service';

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
  shownMetadata : ImageMetadata[] = [];
  loadedImages : ImageData[] = [];
  containerElement : any = null;

  constructor(private stylingService : StylingService, private imageCrud : ImageCrudService, private userService : UserCrudService, private userAuthService : UserAuthService){
    this.userAuthService.currentUserSubject.subscribe();
   }

  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef;
  ngAfterViewInit(){
    this.containerElement = this.containerRef.nativeElement as HTMLElement;
    this.atLeftMargin = this.stylingService.stylePosts(this.containerElement);
    this.imageCrud.getAllMetadata().subscribe(res =>{
      if(!res){
        this.canLoadMore = false;
      }else{
        let allMetadata : ImageMetadata[] = [];
        for(let id in res){
          res[id].id = id;
          allMetadata.push(res[id] as ImageMetadata)
        }
        allMetadata.sort((a : any, b : any) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        for(let oneMetadata of allMetadata){
          this.userService.isFollowing(localStorage.getItem('user') as string, oneMetadata.author as string).subscribe(confirm => {
            if(confirm){
              this.imageMetadata.push(oneMetadata as ImageMetadata);
              this.shownMetadata.push(oneMetadata as ImageMetadata);
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
    for(let i=this.loadedImages.length; i<Math.min(this.shownMetadata.length, targetIndex); i++){
      this.loadedImages.push({ base64Data : 'none', description : '', username : 'loading', id : this.shownMetadata[i].dataID, downloads : 0});
      this.imageCrud.getData(this.shownMetadata[i].dataID).subscribe(res =>{
          this.loadedImages[i].base64Data = res.base64Data;
          this.loadedImages[i].description = res.description;
      });
      this.userService.getUser(this.shownMetadata[i].author.substring(1, this.shownMetadata[i].author.length - 1)).subscribe(res =>{
        this.loadedImages[i].username = res.name;
        this.imageCrud.getData(res.avatarID).subscribe(data => {
              this.loadedImages[i].profilePhoto = data.base64Data;
          }
        )
      })
    }
    if(this.loadedImages.length == this.shownMetadata.length){
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

  handleFilter(event: string) {
    this.loadedImages = [];
    this.canLoadMore = true;
    console.log(event);
    this.shownMetadata = this.imageMetadata.filter(image => image.author === '"' + event + '"');
    this.shownMetadata.sort((a : any, b : any) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    this.loadBatch();
  }

  openPost(event : any){
    console.log('sholdve');
    this.uploadOpen = true;
  }
}
