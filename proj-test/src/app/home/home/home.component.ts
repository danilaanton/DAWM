import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { StylingService } from '../services/styling.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isCollapsed = false;
  atLeftMargin = false;
  cards : any = [{}, {}];
  containerElement : any = null;

  constructor(private stylingService : StylingService){}

  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef;
  ngAfterViewInit(){
    console.log('we now init');
    this.containerElement = this.containerRef.nativeElement as HTMLElement;
    this.stylingService.stylePosts(this.containerElement);
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.stylingService.stylePosts(this.containerElement);
  }
}
