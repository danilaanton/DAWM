import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';
import { UserCrudService } from './user-crud.service';
import * as firebase from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { environment } from 'src/environments/environment';

const auth = getAuth(firebase.initializeApp(environment.firebaseConfig));

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  currentUser?: User;

  get user() {
    return this.currentUser;
  }

  constructor(
    private userCrudService: UserCrudService,
    private router: Router
  ) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user.uid));
        this.userCrudService.getUser(user.uid).subscribe((result) => {
          this.currentUser = result;
        });
      } else {
        localStorage.setItem('user', 'null');
        this.currentUser = undefined;
      }
    });
  }

  async SignIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        this.router.navigate(['home']);
      }
    } catch (error) {
      window.alert((error as any).message);
    }
  }

  async SignUp(email: string, password: string, name: string) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!result.user) {
        return;
      }
      const uid = result.user.uid;
      const user: User = {
        avatar64Data: '',
        name: result.user.displayName || '',
        email: result.user.email || '',
        likedImages: [],
        likedUsers: [],
      };
      await this.userCrudService.addUser(uid, user);
      this.router.navigate(['home']);
    } catch (error) {
      window.alert((error as any).message);
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  SignOut() {
    return auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
