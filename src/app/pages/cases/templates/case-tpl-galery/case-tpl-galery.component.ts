import { Component, OnInit } from '@angular/core';
import { RushSliderService } from 'app/core/shared/components/rush-slider/rush-slider.service';
import { RushSliderConfig } from 'app/core/shared/components/rush-slider/rush-slider-config';

@Component({
  selector: 'app-case-tpl-galery',
  templateUrl: './case-tpl-galery.component.html',
  styleUrls: ['./case-tpl-galery.component.scss']
})
export class CaseTplGaleryComponent implements OnInit {

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
      speed: 1000,
      spaceAround: 5
    })
  }

}
