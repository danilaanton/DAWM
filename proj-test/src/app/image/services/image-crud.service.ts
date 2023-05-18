import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageMetadata } from '../models/image-metadata.interface';
import { HttpClient } from '@angular/common/http';
import { ImageData } from '../models/image-data';

  
@Injectable({
  providedIn: 'root',
})
export class ImageCrudService {
  private apiUrl = 'https://dawm-1b7fb-default-rtdb.firebaseio.com/images';

  constructor(private http: HttpClient) { }

  getAllMetadata() : Observable<any> {
    return this.http.get<ImageMetadata>(`${this.apiUrl}/metadata.json`);
  }

  addImageMetadata(imageMetadata : ImageMetadata){
    return this.http.post<ImageMetadata>(`${this.apiUrl}/metadata.json`, imageMetadata);
  }

  addImageData(imageData : ImageData) : Observable<any>{
    return this.http.post<ImageMetadata>(`${this.apiUrl}/data.json`, imageData);
  }

  getImageMetadata(id: string): Observable<ImageMetadata> {
    if(id == '') id = 'none';
    console.log(id);
    return this.http.get<ImageMetadata>(`${this.apiUrl}/metadata/${id}.json`);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metadata.json`);
  }

  deleteImage(metaid: string){
    this.http.get(`${this.apiUrl}/metadata/${metaid}.json`).subscribe(metadata =>{
      this.http.delete(`${this.apiUrl}/data/${(metadata as ImageMetadata).dataID}.json`).subscribe(_ =>{
        this.http.delete(`${this.apiUrl}/metadata/${metaid}.json`).subscribe(_ => {
          window.location.reload();
        })
      });
    })
  }

  editImageData(id: string, changes: Partial<ImageMetadata>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/data/${id}.json`, changes);
  }
  getData(id : string){
    return this.http.get<ImageData>(`${this.apiUrl}/data/${id}.json`);
  }
  likePhoto(likerId : string, photoId : string){
    return this.http.post(`${this.apiUrl}/data/${photoId}/likes/${likerId}.json`, true);
  }
  dislikePhoto(likerId : string, photoId : string){
    return this.http.delete(`${this.apiUrl}/data/${photoId}/likes/${likerId}.json`);
  }
  getLikes(photoId : string){
    return this.http.get(`${this.apiUrl}/data/${photoId}/likes.json`);
  }
  getDownloads(photoId : string){
    return this.http.get(`${this.apiUrl}/data/${photoId}/downloads.json`);
  }

  addDownload(photoId : string){
    this.getDownloads(photoId).subscribe( nr => {
      console.log(nr);
      return this.http.put(`${this.apiUrl}/data/${photoId}/downloads.json`, (nr as number) + 1).subscribe(confirm => {
        console.log(confirm);
      });
    })
  }
}