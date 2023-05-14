import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { User } from '../models/user.interface';
import { ImageMetadata } from 'src/app/image/models/image-metadata.interface';

@Injectable({
  providedIn: 'root',
})
export class UserCrudService {
  private apiUrl = 'https://dawm-1b7fb-default-rtdb.firebaseio.com/users';

  constructor(private http: HttpClient) {}
  
  addUser(uid: string, user: User) {
    return this.http.put(`${this.apiUrl}/${uid}.json`, user);
  }

  getUser(uid: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${uid}.json`);
  }

  updateUser(uid: string, changes: Partial<User>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${uid}.json`, changes);
  }
  
  getLikedImages(uid: string): Observable<string[]> {
    return this.getUser(uid).pipe(map((user: User) => user.likedImages));
  }
  
  getLikedUsers(uid: string): Observable<string[]> {
    return this.getUser(uid).pipe(map((user: User) => user.likedUsers));
  }
  
  addLikedUser(uid: string, id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/likedUsers/${uid}.json`;
    return this.http.post(url, null);
  }
  
  removeLikedUser(uid: string, id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/likedUsers/${uid}.json`;
    return this.http.delete(url);
  }
  
  addLikedImage(imageId: string, uid: string): Observable<any> {
    const url = `${this.apiUrl}/${uid}/likedImages/${imageId}.json`;
    return this.http.put(url, { liked: true });
  }
  
  removeLikedImage(imageId: string, uid: string): Observable<any> {
    const url = `${this.apiUrl}/${uid}/likedImages/${imageId}.json`;
    return this.http.delete(url);
  }

  isUserLiked(userId: string, uid: string): Observable<boolean> {
    const url = `${this.apiUrl}/${uid}/likedUsers.json`;
    return this.http.get<{[key: string]: boolean}>(url).pipe(
      map((likedUsers) => !!likedUsers[userId])
    );
  }

  isImageLiked(imageId: string, uid: string): Observable<boolean> {
    const url = `${this.apiUrl}/${uid}/likedImages.json`;
    return this.http.get<{[key: string]: boolean}>(url).pipe(
      map((likedImages) => !!likedImages[imageId])
    );
  }
  
  deleteUser(uid: string): Observable<any> {
    const url = `${this.apiUrl}/${uid}.json`;
    return this.http.delete(url);
  }  
}
