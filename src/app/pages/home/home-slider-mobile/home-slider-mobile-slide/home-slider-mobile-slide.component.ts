import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-slider-mobile-slide',
  templateUrl: './home-slider-mobile-slide.component.html',
  styleUrls: ['./home-slider-mobile-slide.component.scss']
})
export class HomeSliderMobileSlideComponent implements OnInit {

  @Input('imageUrl') imageUrl;
  @Input('linesList') linesList;
  @Input('linkData') linkData;

  constructor() { }

  ngOnInit() {
    console.log(this.linesList);
  }

}
