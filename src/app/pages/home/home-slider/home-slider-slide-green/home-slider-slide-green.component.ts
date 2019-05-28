import { Component, OnInit } from '@angular/core';
import { ApiService } from '@osd-services/api.service';
import { PlatformService } from '@osd-services/universal/platform.service';
import { TranslationService } from 'app/core/shared/translation/translation.service';


@Component({
  selector: 'app-home-slider-slide-green',
  templateUrl: './home-slider-slide-green.component.html',
  styleUrls: ['./home-slider-slide-green.component.scss']
})
export class HomeSliderSlideGreenComponent implements OnInit {

  sliderList: any[] = [];
  public currentSlideIndex: number = 0;
  public blockStyles: any = {};

  constructor(
    private _api: ApiService,
    private _platform: PlatformService,
    private _translate: TranslationService
  ) {
    this._loadSlider();
  }

  ngOnInit() {

  }

  private _loadSlider() {
    this._api.get('/slider/list').subscribe(res => {
      this.sliderList = res.body;
      if (this._platform.isBrowser) {
        this._siledrTimer(res.body);
      }
    })
  }

  private _siledrTimer(sliderList: any[]) {
    if (sliderList.length && this.currentSlideIndex <= sliderList.length) {
      setTimeout(() => {
        this.currentSlideIndex++;
        this.blockStyles = {
          'background-color': 'red'
        };
        this._siledrTimer(sliderList);
      }, 5000);
    } else {
      this.currentSlideIndex = 0;
      this.blockStyles = {};
      this._siledrTimer(sliderList);
    }
  }

}
