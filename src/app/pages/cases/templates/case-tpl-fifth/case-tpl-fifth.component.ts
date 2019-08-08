import { Component, OnInit, Input } from '@angular/core';
import { RushSliderService } from 'app/core/shared/components/rush-slider/rush-slider.service';
import { RushSliderConfig } from 'app/core/shared/components/rush-slider/rush-slider-config';
import {hexToRgba} from '../../../../core/helpers/colorHexToRgba';

@Component({
  selector: 'app-case-tpl-fifth',
  templateUrl: './case-tpl-fifth.component.html',
  styleUrls: ['./case-tpl-fifth.component.scss']
})
export class CaseTplFifthComponent implements OnInit {

  public sliderLoad = false;
  public photoSlider: RushSliderService;
  public sliderConfig: Map<number, RushSliderConfig>;
  public slideList: any[];

  private _data: any

  @Input('data')
  set _setData(v : any) {
    this._data = v;
    this.slideList = this.data.photo_list;
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

  photoSliderInit(e) {
    this.photoSlider = e;
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
