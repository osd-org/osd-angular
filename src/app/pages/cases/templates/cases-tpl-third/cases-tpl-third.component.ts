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

  public sliderLoad = false;
  public slider: RushSliderService;
  public sliderConfig: Map<number, RushSliderConfig>;
  private _data: any
  public contentType = CaseSlideContentType;
  public slideList: Array<any> = [];

  @Input('data')
  set _setData(v : any) {
    this._data = v;
    this.slideList = v['slide'];
    this._reloadSlider();
  }

  public get data(): any {
    return this._data;
  }

  constructor() {
    this._initConfig();
  }

  ngOnInit() {

  }

  sliderInit(e) {
    this.slider = e;
  }

  private _initConfig() {
    this.sliderConfig = new Map();
    this.sliderConfig.set(1400, {
      speed: 1000,
      infinite: false,
      ignoreSwipe: true
    })
  }

  public returnBlockStyle(slide) {
    return {
      'background-color': hexToRgba(slide.background_color, slide.background_opacity / 100)
    }
  }

  private _reloadSlider() {
    this.sliderLoad = false;
    setTimeout(() => {
      this.sliderLoad = true;
    });
  }

}
