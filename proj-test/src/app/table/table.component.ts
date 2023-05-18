import { Component } from '@angular/core';
import { ImageCrudService } from '../image/services/image-crud.service';
import { ImageData } from '../image/models/image-data';
import { UserCrudService } from '../user/services/user-crud.service';
import { ImageConverterService } from '../image/services/image-converter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  listOfColumn = [
    {
      title: 'Photo Description',
      compare: (a: ImageData, b: ImageData) =>
        a.description.localeCompare(b.description),
      priority: false,
    },
    {
      title: 'Time of upload',
      compare: (a: ImageData, b: ImageData) => {
        return (a.dateCreated ? a.dateCreated : '').localeCompare(
          b.dateCreated ? b.dateCreated : ''
        );
      },
      priority: 3,
    },
    {
      title: 'Likes',
      compare: (a: ImageData, b: ImageData) => a.likes - b.likes,
      priority: 2,
    },
    {
      title: 'Downloads',
      compare: (a: ImageData, b: ImageData) => a.downloads - b.downloads,
      priority: 1,
    },
  ];

  allImages: ImageData[] = [];
  images: ImageData[] = [];
  modalVisible = false;
  photoData: string = '';
  photoDescription: string = '';
  selectedIndex: number = -1;
  searchTerm: string = '';
  constructor(
    private imageService: ImageCrudService,
    private userService: UserCrudService,
    private imageConverterService: ImageConverterService
  ) {
    this.imageService.getAll().subscribe((metadata) => {
      for (let id in metadata) {
        if (metadata[id].author == (localStorage.getItem('user') as string)) {
          this.imageService.getData(metadata[id].dataID).subscribe((data) => {
            this.imageService
              .getLikes(metadata[id].dataID)
              .subscribe((likes) => {
                let howManyLikes = 0;
                if (likes) {
                  howManyLikes = Object.keys(likes).length || 0;
                }
                let image: ImageData = {
                  base64Data: data.base64Data,
                  description: data.description,
                  dateCreated: new Date(
                    Date.parse(metadata[id].dateCreated)
                  ).toLocaleDateString(),
                  likes: howManyLikes,
                  downloads: data.downloads,
                  id: id,
                  dataID: metadata[id].dataID,
                };
                this.images.push(image);
                this.images = [...this.images];
                this.allImages = this.images;
              });
          });
        }
      }
    });
  }

  setProfilePicture(index: any) {
    let id = localStorage.getItem('user') as string;
    this.imageService
      .getImageMetadata(this.images[index].id as string)
      .subscribe((res) => {
        this.userService
          .setProfilePicture(
            id.substring(1, id.length - 1),
            res.dataID as string
          )
          .subscribe();
      });
  }

  deletePhoto(index: any) {
    this.imageService.deleteImage(this.images[index].id as string);
  }

  handleCancel() {
    this.modalVisible = false;
    this.photoDescription = '';
    this.photoData = '';
    this.selectedIndex = -1;
  }

  handleOk() {
    this.modalVisible = false;

    const imageAtIndex = this.images[this.selectedIndex];
    console.log(imageAtIndex);
    if (!imageAtIndex) return;

    if (
      this.photoData == imageAtIndex.base64Data &&
      this.photoDescription == imageAtIndex.description
    )
      return;
    var changes: Partial<ImageData> = {};

    if (!changes) return;

    if (this.photoData != imageAtIndex.base64Data) {
      const data = this.imageConverterService
        .toBase64(this.photoData)
        .then((result) => {
          changes.base64Data = result;
        });
    }

    if (this.photoDescription != imageAtIndex.description) {
      changes.description = this.photoDescription;
    }

    const id = this.images.at(this.selectedIndex)?.dataID;
    if (!id) return;
    this.imageService
      .editImageData(id, changes)
      .subscribe((result) => window.location.reload());
  }

  showEdit(index: number) {
    this.selectedIndex = index;
    const photoDesc = this.images.at(index)?.description;
    const photoData = this.images.at(index)?.base64Data;
    this.photoDescription = photoDesc ?? '';
    this.photoData = photoData
      ? URL.createObjectURL(
          this.imageConverterService.toFile(photoData, 'file')
        )
      : '';
    this.modalVisible = true;
  }
  search() {
    this.images = this.allImages.filter((image) =>
      image.description.includes(this.searchTerm)
    );
  }
}
