import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LikedUser } from '../models/liked-user.interface';
import { LikedImage } from '../models/liked-image.interface';

@Injectable({
  providedIn: 'root',
})
export class ULikesCrudService {
  private imageApiUrl =
    'https://dawm-1b7fb-default-rtdb.firebaseio.com/liked-images.json';
  private userApiUrl =
    'https://dawm-1b7fb-default-rtdb.firebaseio.com/liked-users.json';

  constructor(private http: HttpClient) {}

  addLikedUser(uid: string, likedUid: string): Observable<any> {
    const likedUser: LikedUser = { uid: uid, likedUid: likedUid };
    return this.http.post(this.userApiUrl, likedUser);
  }
  getLikedUsers(uid: string): Observable<any> {
    const queryParams = {
      orderBy: '"uid"',
      equalTo: `"${uid}"`,
    };
    return this.http.get<any>(this.userApiUrl, { params: queryParams });
  }

  deleteLikedUser(uid: string, likedUid: string): Observable<any> {
    const queryParams = new HttpParams()
      .append('orderBy', '"uid"')
      .append('equalTo', `"${uid}"`)
      .append('orderBy', '"likedUid"')
      .append('equalTo', `"${likedUid}"`);
    return this.http.delete(this.userApiUrl, { params: queryParams });
  }

  getInstancesOfLikedUser(likedUid: string): Observable<any> {
    const params = new HttpParams()
      .set('orderBy', '"likedUid"')
      .set('equalTo', `"${likedUid}"`);
    return this.http.get<any[]>(this.userApiUrl, { params });
  }

  getInstancesOfLikedUserByUser(uid: string): Observable<any> {
    const params = new HttpParams()
      .set('orderBy', '"uid"')
      .set('"equalTo"', `"${uid}"`);
    return this.http.get<any[]>(this.userApiUrl, { params });
  }

  isUserLikedByUser(uid: string, likedUid: any): Observable<boolean> {
    const params = new HttpParams()
      .append('orderBy', '"uid"')
      .append('equalTo', `"${uid}"`)
      .append('orderBy', '"likedUid"')
      .append('equalTo', `"${likedUid}"`);
    return this.http
      .get<any>(this.userApiUrl, { params })
      .pipe(map((response) => !!response));
  }

  addLikedImage(uid: string, likedUid: string): Observable<any> {
    const likedImage: LikedImage = { uid: uid, likedUid: likedUid };
    return this.http.post(this.imageApiUrl, likedImage);
  }
  getLikedImage(uid: string): Observable<any> {
    const queryParams = {
      orderBy: '"uid"',
      equalTo: `"${uid}"`,
    };
    return this.http.get<any>(this.imageApiUrl, { params: queryParams });
  }

  deleteLikedImage(uid: string, likedUid: string): Observable<any> {
    const queryParams = new HttpParams()
      .append('orderBy', '"uid"')
      .append('equalTo', `"${uid}"`)
      .append('orderBy', '"likedUid"')
      .append('equalTo', `"${likedUid}"`);
    return this.http.delete(this.imageApiUrl, { params: queryParams });
  }

  getInstancesOfLikedImage(likedUid: string): Observable<any> {
    const params = new HttpParams()
      .set('orderBy', '"likedUid"')
      .set('equalTo', `"${likedUid}"`);
    return this.http
      .get<any[]>(this.imageApiUrl, { params });
  }

  getInstancesOfLikedImagesByUser(uid: string): Observable<any> {
    const params = new HttpParams()
      .set('orderBy', '"uid"')
      .set('"equalTo"', `"${uid}"`);
    return this.http
      .get<any[]>(this.imageApiUrl, { params });
  }

  isImageLikedByUser(uid: string, likedUid: any): Observable<boolean> {
    const params = new HttpParams()
      .append('orderBy', '"uid"')
      .append('equalTo', `"${uid}"`)
      .append('orderBy', '"likedUid"')
      .append('equalTo', `"${likedUid}"`);
    return this.http
      .get<any>(this.imageApiUrl, { params })
      .pipe(map((response) => !!response));
  }
}
