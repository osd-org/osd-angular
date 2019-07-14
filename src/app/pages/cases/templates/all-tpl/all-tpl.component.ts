import { CaseSlideContentType } from './../../case.service';
import { RushSliderConfig } from './../../../../core/shared/components/rush-slider/rush-slider-config';
import { RushSliderService } from './../../../../core/shared/components/rush-slider/rush-slider.service';
import { Component, OnInit, Input } from '@angular/core';
import { hexToRgba } from '../../../../core/helpers/colorHexToRgba';

@Component({
  selector: 'app-all-tpl',
  templateUrl: './all-tpl.component.html',
  styleUrls: ['./all-tpl.component.scss']
})
export class AllTplComponent implements OnInit {

  public sliderLoad = false;
  private _data: any

  @Input('data')
  set _setData(v : any) {
    this._data = v;
    console.log(v);

    this.slideList = v;
    this._reloadSlider();
  }

  public get data(): any {
    return this._data;
  }



  public contentType = CaseSlideContentType;

  public slider: RushSliderService;

  public sliderConfig: Map<number, RushSliderConfig>;

  public slideList: Array<any> = [];

  constructor() {
    this._initConfig();
  }

  ngOnInit() {
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

  private _reloadSlider() {
    this.sliderLoad = false;
    setTimeout(() => {
      this.sliderLoad = true;
    });
  }

}
