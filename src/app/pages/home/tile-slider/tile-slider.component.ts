import { Component, OnInit, ContentChildren, AfterContentInit } from '@angular/core';
import { TileSlideComponent } from './tile-slide/tile-slide.component';
import { fromEvent } from 'rxjs';
import { throttleTime, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-tile-slider',
  templateUrl: './tile-slider.component.html',
  styleUrls: ['./tile-slider.component.scss']
})
export class TileSliderComponent implements OnInit, AfterContentInit {

  @ContentChildren(TileSlideComponent) slidesQueryList;

  private _sliderList: Array<TileSlideComponent> = [];

  private _currentSlide = 0;

  private _allowSlideChanging: boolean;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterContentInit() {
    this._sliderList = this.slidesQueryList.toArray();

    this.showFirstSlide();

    setInterval(() => {
      this.nextSlide();
    }, 7000);
  }

  /**
   * 
   */
  disableSlideChanging() {
    this._allowSlideChanging = false;

    setTimeout(() => {
      this._allowSlideChanging = true;
    }, 5000);
  }

  /**
   * 
   */
  nextSlide() {
    if (!this._allowSlideChanging) {
      return;
    }

    this.hideCurrentSlide();

    if (this._currentSlide + 1 >= this._sliderList.length) {
      this._currentSlide = 0;
    } else {
      this._currentSlide ++;
    }

    this._sliderList[this._currentSlide].show()

    this.disableSlideChanging();
  }

  /**
   * 
   */
  prevSlide() {
    if (!this._allowSlideChanging) {
      return;
    }

    this.hideCurrentSlide();

    if (this._currentSlide - 1 < 0) {
      this._currentSlide = this._sliderList.length - 1;
    } else {
      this._currentSlide --;
    }

    this._sliderList[this._currentSlide].show();

    this.disableSlideChanging();
  }

  /**
   * 
   */
  showFirstSlide() {
    this._sliderList[this._currentSlide].show();

    this.disableSlideChanging();
  }

  /**
   * 
   */
  hideCurrentSlide() {
    this._sliderList[this._currentSlide].hide();
  }

  /**
   * 
   */
  private _initEventListeners() {
    
  }

}
