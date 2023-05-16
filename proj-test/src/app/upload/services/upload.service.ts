import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ImageMetadata } from 'src/app/image/models/image-metadata.interface';
import { ImageData } from 'src/app/image/models/image-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = 'https://dawm-1b7fb-default-rtdb.firebaseio.com/images';

  constructor(private http: HttpClient) { }

  addImage(imageMetadata: ImageMetadata, imageData: ImageData) : Observable<any> {
    return this.addImageData(imageData).pipe(
      switchMap((key) => {
        imageMetadata.dataID = key.name;
        return this.addImageMetadata(imageMetadata);
      })
    );
  }

  addImageMetadata(imageMetadata : ImageMetadata){
    return this.http.post<ImageMetadata>(`${this.apiUrl}/metadata.json`, imageMetadata);
  }

  addImageData(imageData : ImageData) : Observable<any>{
    return this.http.post<ImageMetadata>(`${this.apiUrl}/data.json`, imageData);
  }
}
