import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home-slider-mobile-slide',
  templateUrl: './home-slider-mobile-slide.component.html',
  styleUrls: ['./home-slider-mobile-slide.component.scss']
})
export class HomeSliderMobileSlideComponent implements OnInit {

  @Input('imageUrl') imageUrl;
  @Input('linesList') linesList;
  @Input('linkData') linkData;

  constructor(
    public el: ElementRef
  ) { }

  ngOnInit() {
    
  }

  get link(): string {
    return this.linkData.url;
  }

  hide (callback: Function = () => {}) {
    this.el.nativeElement.style.transition = '1s linear';
    this.el.nativeElement.style.transform = 'translateX(-100%)';
    this.el.nativeElement.classList.add('hide');

    setTimeout(() => {
      this.el.nativeElement.classList.remove('hide');
      this.el.nativeElement.style.transition = 'none';
      this.el.nativeElement.style.transform = 'translateX(0)';
      this.el.nativeElement.style.zIndex = '-1';

      callback();
    }, 1000);
  }

}
