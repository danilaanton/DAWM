import { Component } from '@angular/core';
import { ImageConverterService } from './image/services/image-converter.service';
import { ImageCrudService } from './image/services/image-crud.service';
import { ImageMetadata } from './image/models/image-metadata.interface';
import { catchError, concatMap, from, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url?: string;
  download?:string;
  title = 'proj-test';
  constructor(private s: ImageConverterService, private c: ImageCrudService) {
    ////FILE TO TEST REQUESTS
    /*
    from(
      s.toBase64(
        'https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg'
      )
    ).pipe(
      switchMap((base64String) => {
        const image: ImageMetadata = {
          base64Data: base64String,
          author: 'John',
          title: 'Beautiful Mountain',
          description: 'A stunning view of the mountain',
        };
    
        return this.c.addImage(image).pipe(
          concatMap((response: any) => {
            console.log('Image added successfully: ', response);
            const id = response.name;
    
            return this.c.getImage(id).pipe(
              tap((image) => {
                console.log('Retrieved image: ', image);
                const file = s.toFile(image.base64Data, image.title);
                this.url = URL.createObjectURL(file);
                this.download = image.title;
              }),
              catchError((error) => {
                console.error('Failed to retrieve image: ', error);
                return throwError(error);
              }),
              concatMap(() => {
                const updatedImageMetadata = {
                  title: 'New Title',
                };
                return this.c.editImage(id, updatedImageMetadata).pipe(
                  tap((response) => {
                    console.log('Successfully updated image metadata:', response);
                  }),
                  catchError((error) => {
                    console.error('Error updating image metadata:', error);
                    return throwError(error);
                  })
                );
              })
            );
          }),
          catchError((error) => {
            console.error('Failed to add image: ', error);
            return throwError(error);
          })
        );
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe();
    */
  }
}
