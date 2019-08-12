import {Component, Input, OnInit} from '@angular/core';
import {RushSliderService} from '../../../../core/shared/components/rush-slider/rush-slider.service';
import {RushSliderConfig} from '../../../../core/shared/components/rush-slider/rush-slider-config';

@Component({
  selector: 'app-case-tpl-images',
  templateUrl: './case-tpl-images.component.html',
  styleUrls: ['./case-tpl-images.component.scss']
})
export class CaseTplImagesComponent implements OnInit {

  private _data: any;

  public sliderLoad: boolean;

  public sliderConfig: Map<number, RushSliderConfig>;
  public slider: RushSliderService;

  @Input('data')
  set _setData(v : any) {
    this._data = v;
    this._reloadSlider();
  }

  constructor() {
    this._initConfig();
  }

  ngOnInit() {
  }

  sliderInit(slider: RushSliderService) {
    this.slider = slider;
  }

  public get data(): any {
    return this._data;
  }

  private _initConfig() {
    this.sliderConfig = new Map();
    this.sliderConfig.set(1400, {
      speed: 400,
    })
  }

  private _reloadSlider() {
    this.sliderLoad = false;
    setTimeout(() => {
      this.sliderLoad = true;
    });
  }

}
