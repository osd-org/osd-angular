import { Component, OnInit, Input } from '@angular/core';
import { RushSliderService } from 'app/core/shared/components/rush-slider/rush-slider.service';
import { RushSliderConfig } from 'app/core/shared/components/rush-slider/rush-slider-config';

@Component({
  selector: 'app-case-tpl-fifth',
  templateUrl: './case-tpl-fifth.component.html',
  styleUrls: ['./case-tpl-fifth.component.scss']
})
export class CaseTplFifthComponent implements OnInit {

  public sliderLoad = false;
  public slider: RushSliderService;
  public sliderConfig: Map<number, RushSliderConfig>;
  public slideList: any[];

  private _data: any

  @Input('data')
  set _setData(v : any) {
    this._reloadSlider();
    this._data = v;
    this.slideList = this.data.acf[this.data.slug]['slide'];
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
}
