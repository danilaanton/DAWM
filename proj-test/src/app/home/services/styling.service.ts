import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylingService {

  constructor() { }
  isAtLeftMargin = false;

  stylePosts(containerElement : HTMLElement){
  if (window.innerWidth <= 980) {
      if(!this.isAtLeftMargin){
      containerElement.style.justifyContent = 'start';
      containerElement.style.alignItems = 'start';
      containerElement.style.paddingLeft = '235px';
      this.isAtLeftMargin = true;
      }
      return true;
    } else {
      if(this.isAtLeftMargin){
      containerElement.style.justifyContent = 'center';
      containerElement.style.alignItems = 'center';
      containerElement.style.paddingLeft = '0px';
      this.isAtLeftMargin = false;
      }
      return false;
    }
  }

}
