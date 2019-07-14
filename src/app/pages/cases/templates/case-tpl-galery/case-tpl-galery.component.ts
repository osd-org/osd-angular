import { Component, OnInit, Input } from '@angular/core';
import { RushSliderService } from 'app/core/shared/components/rush-slider/rush-slider.service';
import { RushSliderConfig } from 'app/core/shared/components/rush-slider/rush-slider-config';
import { ModalsService } from 'app/core/modules/modals/modals.service';

@Component({
  selector: 'app-case-tpl-galery',
  templateUrl: './case-tpl-galery.component.html',
  styleUrls: ['./case-tpl-galery.component.scss']
})
export class CaseTplGaleryComponent implements OnInit {

  public sliderLoad = false;
  public slider: RushSliderService;
  public sliderConfig: Map<number, RushSliderConfig>;
  public slideList: any[];
  private _slidesPerPage = 6;

  private _data: any

  @Input('data')
  set _setData(v : any) {
    console.log(v);

    this._reloadSlider();
    this._data = v;
    this.slideList = this._mapSliderData(this.data['gallery']);
  }

  public get data(): any {
    return this._data;
  }

  constructor(
    private _modals: ModalsService
  ) {
    this._initConfig();
  }

  ngOnInit() {
  }

  sliderInit(e) {
    this.slider = e;
  }

  openPhoto(img: any) {
    this._modals.open('photo', img);
  }

  private _initConfig() {
    this.sliderConfig = new Map();
    this.sliderConfig.set(1400, {
      speed: 400,
      spaceAround: 5
    })
  }

  private _mapSliderData(gallery: any[]) {
    const galleryList = [];
    if (gallery.length && gallery.length > this._slidesPerPage) {
      Array.from(Array(Math.ceil(gallery.length / this._slidesPerPage))).forEach((e, i) => {
        galleryList.push({slide: gallery.slice(i * this._slidesPerPage, this._slidesPerPage + (this._slidesPerPage * i))})
      });
    }
    return galleryList;
  }

  private _reloadSlider() {
    this.sliderLoad = false;
    setTimeout(() => {
      this.sliderLoad = true;
    });
  }
}
