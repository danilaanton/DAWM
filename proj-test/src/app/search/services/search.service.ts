import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/user/models/user.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'https://dawm-1b7fb-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  followUser(followerId : string, followedId : string) : Observable<any>{
    return this.http.post(`${this.apiUrl}/follows/${followerId}/${followedId}.json`, true);
  }
  unfollowUser(followerId : string, followedId : string) : Observable<any>{
    return this.http.delete(`${this.apiUrl}/follows/${followerId}/${followedId}.json`)
  }
  isFollowing(followerId : string, followedId : string){
    return this.http.get(`${this.apiUrl}/follows/${followerId}/${followedId}.json`)
  }
  searchUsersByTerm(term: string) : Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}/users.json`)
      .pipe(
        map((users: User[]) => {
          const lowerCaseTerm = term.toLowerCase();
          for(let id in users){
            users[id].id = id;
          }
          const filteredUsers = Object.values(users)
            .filter(user => user.name.toLowerCase().includes(lowerCaseTerm));
          return filteredUsers;
        })
      );
  }
}
