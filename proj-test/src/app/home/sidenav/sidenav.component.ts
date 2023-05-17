import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  searchVisible : boolean = false;
  constructor(private router : Router){}
  @Output() openPost = new EventEmitter();
  expandSearch(){
    this.searchVisible = !this.searchVisible;
  }
  goToPost(){
    const scrollToOptions: ScrollToOptions = {
      top: 0,
      behavior: 'smooth',
    };
    this.openPost.emit();
    window.scrollTo(scrollToOptions);
  }
  goToTable(){
    console.log('my god');
    this.router.navigate(['myposts']);
  }
}
