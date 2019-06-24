import { RushSliderConfig } from './../../../../core/shared/components/rush-slider/rush-slider-config';
import { RushSliderService } from './../../../../core/shared/components/rush-slider/rush-slider.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cases-tpl-third',
  templateUrl: './cases-tpl-third.component.html',
  styleUrls: ['./cases-tpl-third.component.scss']
})
export class CasesTplThirdComponent implements OnInit {

  public slider: RushSliderService;

  public sliderConfig: Map<number, RushSliderConfig>;

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
      speed: 1000
    })
  }

}
