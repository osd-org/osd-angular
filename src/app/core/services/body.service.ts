import { EventEmitter, Injectable } from '@angular/core';
import { PlatformService } from '@osd-services/universal/platform.service';
import { WindowService } from '@osd-services/universal/window.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class BodyService {

  private _documentEl: HTMLElement;
  private _bodyEl: HTMLElement;

  private _windowEl: Window;

  private _scrollPos = 0;

  private _allowSwipe = true;

  private _onSwipeRight: EventEmitter<any> = new EventEmitter<any>();
  private _onSwipeLeft: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _window: WindowService,
    private _platform: PlatformService,
    private _deviseDetector: DeviceDetectorService
  ) {
    this._windowEl = this._window.nativeWindow;

    if (this._platform.isBrowser) {
      this._documentEl = document.documentElement;
      this._bodyEl = document.body;
    }

    // this._initHammer();
  }

  /**
   * Returns document element
   */
  get documentEl(): HTMLElement {
    return this._documentEl;
  }

  /**
   * Returns swipe left emitter
   */
  get swipeLeft$(): EventEmitter<any> {
    return this._onSwipeLeft;
  }

  /**
   * Returns swipe right emitter
   */
  get swipeRight$(): EventEmitter<any> {
    return this._onSwipeRight;
  }

  /**
   * Enable swipe events
   */
  public enableSwipe() {
    this._allowSwipe = true;
  }

  /**
   * Disable swipe events
   */
  public disableSwipe() {
    this._allowSwipe = false;
  }

  /**
   * Disable body scrolling
   */
  public disableScroll() {
    if (this._platform.isBrowser) {
      this._scrollPos = this._windowEl.scrollY;
      this._documentEl.classList.add('no-scroll');

      if (this._isIOS()) {
        this._documentEl.classList.add('no-scroll-ios');
      }
    }
  }

  /**
   * Enable body scrolling
   */
  public enableScroll() {
    if (this._platform.isBrowser) {
      this._documentEl.classList.remove('no-scroll');

      if (this._isIOS()) {
        this._documentEl.classList.remove('no-scroll-ios');
        this._windowEl.scrollTo(0, this._scrollPos);
      }
    }
  }

  /**
   * Returns Bounding Client Rect
   *
   * @param el
   */
  public getElementClientRect(el: HTMLElement) {
    return el.getBoundingClientRect();
  }

  /**
   * Smooth scroll to DOM element
   *
   * @param el
   * @param duration
   */
  public scrollToElement(el: HTMLElement, duration: number = 1000) {
    const startingY: number = this._windowEl.pageYOffset;
    const elementY: number = startingY + this.getElementClientRect(el).top;
    const self = this;
    const diff: any = elementY - startingY;

    const easing = function (t) {
      return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    let start;

    if (Math.abs(diff) <= 10) {
      return;
    }

    this._windowEl.requestAnimationFrame(function step(timestamp) {
      if (!start) {
        start = timestamp;
      }

      const time = timestamp - start;

      let percent = Math.min(time / duration, 1);
      percent = easing(percent);

      self._windowEl.scrollTo(0, startingY + diff * percent);

      if (time < duration) {
        self._windowEl.requestAnimationFrame(step);
      }
    });
  }

  /**
   * Return true if application runs on IOS
   *
   * @private
   */
  private _isIOS(): boolean {
    const iosRegex = /ipad|iphone|ipod/i;
    return iosRegex.test(navigator.userAgent) || (!!navigator.platform && iosRegex.test(navigator.platform));
  }

  /**
   * Init hammer events
   *
   * @private
   */
  // private _initHammer() {
  //   delete Hammer.defaults.cssProps.userSelect;

  //   const hammer = new Hammer(this._documentEl, {
  //     touchAction: 'auto',
  //     inputClass: Hammer.TouchInput
  //   });

  //   hammer.get('pan').set({
  //     direction: Hammer.DIRECTION_ALL,
  //     threshold: 100
  //   });

  //   hammer.on('panright', e => {
  //     if (this._allowSwipe) {
  //       this._onSwipeRight.next(e);
  //     }
  //   });

  //   hammer.on('panleft', e => {
  //     if (this._allowSwipe) {
  //       this._onSwipeLeft.next(e);
  //     }
  //   });
  // }
}
