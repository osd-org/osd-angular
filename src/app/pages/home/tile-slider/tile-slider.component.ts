import { Component, OnInit, ContentChildren, AfterContentInit, OnDestroy, EventEmitter, Input } from '@angular/core';
import { TileSlideComponent } from './tile-slide/tile-slide.component';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tile-slider',
  templateUrl: './tile-slider.component.html',
  styleUrls: ['./tile-slider.component.scss']
})
export class TileSliderComponent implements OnInit, OnDestroy, AfterContentInit {

  @ContentChildren(TileSlideComponent) slidesQueryList;

  private _sliderList: Array<TileSlideComponent> = [];

  private _currentSlide = 0;

  private _allowSlideChanging: boolean;

  private _alive$: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this._initEventListeners();
  }

  ngOnDestroy() {
    this._alive$.complete();
  }

  ngAfterContentInit() {
    this._sliderList = this.slidesQueryList.toArray();

    this.showFirstSlide();
  }

  /**
   * 
   */
  disableSlideChanging() {
    this._allowSlideChanging = false;

    setTimeout(() => {
      this._allowSlideChanging = true;
    }, 4000);
  }

  /**
   * 
   */
  nextSlide() {
    this.hideCurrentSlide();

    if (this._currentSlide + 1 >= this._sliderList.length) {
      this._currentSlide = 0;
    } else {
      this._currentSlide ++;
    }

    setTimeout(() => {
      this._sliderList[this._currentSlide].show()
    }, 2000);

    this.disableSlideChanging();
  }

  /**
   * 
   */
  prevSlide() {
    this.hideCurrentSlide();

    if (this._currentSlide - 1 < 0) {
      this._currentSlide = this._sliderList.length - 1;
    } else {
      this._currentSlide --;
    }

    setTimeout(() => {
      this._sliderList[this._currentSlide].show();
    }, 2000);

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
    fromEvent(window, 'wheel').pipe(
      takeUntil(this._alive$)
    ).subscribe((e: MouseWheelEvent) => {
      if (this._allowSlideChanging) {
        if (e.deltaY > 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      }
    });
  }

}
