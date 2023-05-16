import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ImageMetadata } from '../models/image-metadata.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs';

  
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

  getImage(id: string): Observable<ImageMetadata> {
    return this.http.get<ImageMetadata>(`${this.apiUrl}/${id}.json`);
  }

  getAll(): Observable<ImageMetadata> {
    return this.http.get<ImageMetadata>(`${this.apiUrl}.json`);
  }

  deleteImage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}.json`);
  }

  editImage(id: string, changes: Partial<ImageMetadata>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}.json`, changes);
  }
}
