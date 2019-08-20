import { Component, OnInit, ContentChildren, AfterContentInit, OnDestroy, EventEmitter, Input } from '@angular/core';
import { TileSlideComponent } from './tile-slide/tile-slide.component';
import {fromEvent, timer} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import { PlatformService } from '@osd-services/universal/platform.service';
import { WindowService } from '@osd-services/universal/window.service';
import { untilDestroyed } from '@osd-rxjs/operators';

/**
 * Available timer events
 */
enum TimerEvent {
  RESET = 'reset'
}

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

  private _timerEvents$: EventEmitter<TimerEvent> = new EventEmitter<TimerEvent>();

  constructor(
    private _paltform: PlatformService,
    private _window: WindowService
  ) { }

  ngOnInit() {
    if (this._paltform.isBrowser) {
      this._initEventListeners();
      this._handleTimer();
    }

    this._timerEvents$.next(TimerEvent.RESET);
  }

  ngOnDestroy() {

  }

  ngAfterContentInit() {
    setTimeout(() => {
    this._sliderList = this.slidesQueryList.toArray();
    this.showFirstSlide();
    }, 1000);
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
    this._timerEvents$.next(TimerEvent.RESET);
    this.hideCurrentSlide();

    if (this._currentSlide + 1 >= this._sliderList.length) {
      this._currentSlide = 0;
    } else {
      this._currentSlide ++;
    }
    if (this._paltform.isBrowser) {
      setTimeout(() => {
        this._sliderList[this._currentSlide].show()
      }, 2000);
      this.disableSlideChanging();
    }
  }

  /**
   *
   */
  prevSlide() {
    this._timerEvents$.next(TimerEvent.RESET);
    this.hideCurrentSlide();

    if (this._currentSlide - 1 < 0) {
      this._currentSlide = this._sliderList.length - 1;
    } else {
      this._currentSlide --;
    }

    if (this._paltform.isBrowser) {
      setTimeout(() => {
        this._sliderList[this._currentSlide].show();
      }, 2000);
      this.disableSlideChanging();
    }
  }

  /**
   *
   */
  showFirstSlide() {
    this._sliderList[this._currentSlide].show();
    if (this._paltform.isBrowser) {
      this.disableSlideChanging();
    }
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
    fromEvent(this._window.nativeWindow, 'wheel').pipe(
      untilDestroyed(this)
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

  private _handleTimer() {
    this._timerEvents$.pipe(
      untilDestroyed(this),
      switchMap(event => {
        switch (event) {
          case TimerEvent.RESET:
            return timer(10000);
        }
      })
    ).subscribe(() => {
      this.nextSlide();
      this._timerEvents$.next(TimerEvent.RESET);
    })
  }

}
