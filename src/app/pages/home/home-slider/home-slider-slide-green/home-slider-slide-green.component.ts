import { Component, OnInit } from '@angular/core';
import { ApiService } from '@osd-services/api.service';

@Component({
  selector: 'app-home-slider-slide-green',
  templateUrl: './home-slider-slide-green.component.html',
  styleUrls: ['./home-slider-slide-green.component.scss']
})
export class HomeSliderSlideGreenComponent implements OnInit {

  sliderList: any[] = [];

  constructor(
    private _api: ApiService
  ) {
    this._api.get('/slider/list').subscribe(e => {
      this.sliderList = e;
    })
  }

  ngOnInit() {
  }

}
