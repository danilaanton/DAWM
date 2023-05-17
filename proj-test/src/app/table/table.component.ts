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
  images : ImageData[] = [];
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
              console.log(metadata[id].dateCreated);
              let image : ImageData = { base64Data : data.base64Data, description : data.description, dateCreated : new Date(Date.parse(metadata[id].dateCreated)).toLocaleDateString(), likes : howManyLikes, downloads : data.downloads, id : metadata[id].dataID }
              this.images.push(image);
              this.images = ([...this.images]);
            })
          })
        }
      }
    })
  }

  setProfilePicture(index : any){
    let id = (localStorage.getItem('user') as string);
    this.userService.setProfilePicture(id.substring(1, id.length - 1), this.images[index].id as string)
    .subscribe(res => {
      console.log(res);
    });
  }
}
