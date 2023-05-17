import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  searchVisible : boolean = false;
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
}
