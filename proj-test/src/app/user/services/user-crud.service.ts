import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserCrudService {
  private apiUrl = 'https://dawm-1b7fb-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  addUser(uid: string, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${uid}.json`, user);
  }
  getUser(uid: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${uid}.json`);
  }
  updateUser(uid: string, changes: Partial<User>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${uid}.json`, changes);
  }
  deleteUser(uid: string): Observable<any> {
    const url = `${this.apiUrl}/users/${uid}.json`;
    return this.http.delete(url);
  }
  followUser(followerId : string, followedId : string){
    return this.http.post(`${this.apiUrl}/follows/${followerId}/${followedId}.json`, true);
  }
  unfollowUser(followerId : string, followedId : string){
    return this.http.delete(`${this.apiUrl}/follows/${followerId}/${followedId}.json`)
  }
  isFollowing(followerId : string, followedId : string){
    console.log('follower: ' + followedId);
    console.log('followed: ' + followedId);
    return this.http.get(`${this.apiUrl}/follows/${followerId}/${followedId}.json`)
  }
}
