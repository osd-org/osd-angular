import { Component, OnInit, Input } from '@angular/core';
import { RushSliderService } from 'app/core/shared/components/rush-slider/rush-slider.service';
import { RushSliderConfig } from 'app/core/shared/components/rush-slider/rush-slider-config';
import {hexToRgba} from '../../../../core/helpers/colorHexToRgba';

@Component({
  selector: 'app-case-tpl-fourth',
  templateUrl: './case-tpl-fourth.component.html',
  styleUrls: ['./case-tpl-fourth.component.scss']
})
export class CaseTplFourthComponent implements OnInit {

  public sliderLoad = false;
  public slider: RushSliderService;
  public sliderConfig: Map<number, RushSliderConfig>;
  public slideList: any[];

  private _data: any;

  @Input('data')
  set _setData(v : any) {
    this._data = v;
    this.slideList = this.data.video_list;
    this._returnBlockStyle();
    this._reloadSlider();
  }

  public get data(): any {
    return this._data;
  }

  constructor(
  ) {
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
      speed: 400,
      spaceAround: 5
    })
  }

  private _reloadSlider() {
    this.sliderLoad = false;
    setTimeout(() => {
      this.sliderLoad = true;
    });
  }

  private _returnBlockStyle() {
    this.data.background_color_opacity = {'background-color': hexToRgba(this.data.background_color, this.data.background_opacity / 100)};
  }
}
