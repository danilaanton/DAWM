import { Component } from '@angular/core';
import { ImageCrudService } from '../image/services/image-crud.service';
import { ImageData } from '../image/models/image-data';
import { UserCrudService } from '../user/services/user-crud.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  allImages : ImageData[] = [];
  images : ImageData[] = [];
  modalVisible = false;
  photoData : string = '';
  photoDescription : string = '';
  searchTerm : string = '';
  constructor(private imageService : ImageCrudService, private userService : UserCrudService){
    this.imageService.getAll().subscribe(metadata => {
      for(let id in metadata){
        if(metadata[id].author == localStorage.getItem("user") as string){
          this.imageService.getData(metadata[id].dataID).subscribe(data => {
            this.imageService.getLikes(metadata[id].dataID).subscribe(likes => {
              let howManyLikes = 0;
              if(likes){
                howManyLikes = (Object.keys(likes).length) || 0;
              }
              let image : ImageData = { base64Data : data.base64Data, description : data.description, dateCreated : new Date(Date.parse(metadata[id].dateCreated)).toLocaleDateString(), likes : howManyLikes, downloads : data.downloads, id : id }
              this.images.push(image);
              this.images = ([...this.images]);
              this.allImages = this.images;
            })
          })
        }
      }
    })
  }

  setProfilePicture(index : any){
    let id = (localStorage.getItem('user') as string);
    this.imageService.getImageMetadata(this.images[index].id as string).subscribe(res => {
      this.userService.setProfilePicture(id.substring(1, id.length - 1), res.dataID as string).subscribe()
    })
  }

  deletePhoto(index : any){
    this.imageService.deleteImage(this.images[index].id as string)
  }

  handleCancel(){
    this.modalVisible = false;
  }

  handleOk(){
    this.modalVisible = false;
  }
  showEdit(){
    this.modalVisible = true;
  }
  onDropdownChange(target : any){
    const selectedValue = (target as HTMLSelectElement).value;
    switch (selectedValue) {
      case 'description':
        this.images = this.images.sort((a : any, b : any) => a.description.localeCompare(b.description));
        this.images = ([...this.images])
        return;
      case 'dateCreated':
        this.images = this.images.sort((a : any, b : any) => a.dateCreated.localeCompare(b.dateCreated));
        this.images = ([...this.images])
        return;
      case 'likes':
        this.images = this.images.sort((a : any, b : any) => a.likes - b.likes);
        this.images = ([...this.images])
        return;
      case 'downloads':
        this.images = this.images.sort((a : any, b : any) => a.downloads - b.downloads);
        this.images = ([...this.images])
        return;
    }
  }
  search(){
    this.images = this.allImages.filter(image => image.description.includes(this.searchTerm));
  }
}
