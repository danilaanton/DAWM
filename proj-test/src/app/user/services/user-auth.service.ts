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
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const auth = getAuth(firebase.initializeApp(environment.firebaseConfig));

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  
  private currentUser: User | undefined;
  currentUserSubject = new Subject<User | undefined>();

  get user() {
    return this.currentUser;
  }

  set user(userToSet: any) {
    this.currentUser = userToSet;
    this.currentUserSubject.next(userToSet);
  }

  constructor(
    private userCrudService: UserCrudService,
    private router: Router
  ) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user.uid));
        this.userCrudService.getUser(user.uid).subscribe((result) => {
        this.user = result;
        });
        router.navigate(['home']);
      } else {
        localStorage.setItem('user', 'null');
        this.user = undefined;
        router.navigate(['']);
      }
    });
  }

  SignIn(email: string, password: string, remember: boolean): Promise<any> {
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user) {
          if (remember) {
            setPersistence(auth, browserLocalPersistence)
              .catch((error) => {
                console.log((error as any).message);
              });
          } else {
            setPersistence(auth, browserSessionPersistence)
              .catch((error) => {
                console.log((error as any).message);
              });
          }
        }
      })
      .catch((error) => {
        console.log((error as any).message);
        location.reload();
        localStorage.setItem(
          'authErrorMessage',
          'Sign-in failed. Please try again.'
        );
      });
  }

  SignUp(email: string, password: string, name: string): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (!result.user) {
          return;
        }
        const uid = result.user.uid;
        const user: User = {
          avatarID: '',
          name: name,
          email: result.user.email || '',
        };
        return this.userCrudService.addUser(uid, user).subscribe(() => {
          setPersistence(auth, browserSessionPersistence)
              .catch((error) => {
                console.log((error as any).message);
              });
        });
      })
      .catch((error) => {
        console.log((error as any).message);
        location.reload();
        localStorage.setItem(
          'authErrorMessage',
          'Sign-up failed. Make sure email is valid and password is at least 6 characters long.'
        );
      });
  }

  SignOut() {
    return auth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }
}
