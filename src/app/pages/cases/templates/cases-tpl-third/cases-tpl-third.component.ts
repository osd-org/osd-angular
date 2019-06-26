import { CaseSlideContentType } from './../../case.service';
import { RushSliderConfig } from './../../../../core/shared/components/rush-slider/rush-slider-config';
import { RushSliderService } from './../../../../core/shared/components/rush-slider/rush-slider.service';
import { Component, OnInit, Input } from '@angular/core';
import { hexToRgba } from '../../../../core/helpers/colorHexToRgba';

@Component({
  selector: 'app-cases-tpl-third',
  templateUrl: './cases-tpl-third.component.html',
  styleUrls: ['./cases-tpl-third.component.scss']
})
export class CasesTplThirdComponent implements OnInit {

  @Input('data') data: any;

  public contentType = CaseSlideContentType;

  public slider: RushSliderService;

  public sliderConfig: Map<number, RushSliderConfig>;

  public slideList: Array<any> = [];

  constructor() {
    this._initConfig();
  }

  ngOnInit() {
    this.slideList = this.data.acf[this.data.slug].slide;
    console.log(this.slideList);
  }

  sliderInit(e) {
    this.slider = e;
  }

  private _initConfig() {
    this.sliderConfig = new Map();
    this.sliderConfig.set(1400, {
      speed: 1000
    })
  }

  public returnBlockStyle(slide) {
    return {
      'background-color': hexToRgba(slide.background_color, slide.background_opacity / 100)
    }
  }

}
