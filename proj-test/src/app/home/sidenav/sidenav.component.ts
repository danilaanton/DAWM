import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/user/services/user-auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  searchVisible: boolean = false;
  constructor(
    private router: Router,
    private userAuthService: UserAuthService
  ) {}
  @Output() openPost = new EventEmitter();
  expandSearch() {
    this.searchVisible = !this.searchVisible;
  }
  goToPost() {
    const scrollToOptions: ScrollToOptions = {
      top: 0,
      behavior: 'smooth',
    };
    this.openPost.emit();
    window.scrollTo(scrollToOptions);
  }
  goToTable() {
    console.log('my god');
    this.router.navigate(['myposts']);
  }

  logOut() {
    this.userAuthService.SignOut();
  }
}
