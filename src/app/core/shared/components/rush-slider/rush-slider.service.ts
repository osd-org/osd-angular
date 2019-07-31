import { Injectable, EventEmitter } from '@angular/core';
import { RushSliderConfig } from './rush-slider-config';
import { RushSlideComponent } from './rush-slide/rush-slide.component';
import { fromEvent, merge } from 'rxjs';
import { takeUntil, debounceTime, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RushSliderService {

  /**
   * Count of slide clones
   */
  private readonly _additionalSlidesCount = 2;

  /**
   * Default config values
   */
  private _defaultConfig: RushSliderConfig = {
    speed: 1000,
    autoSliding: 0,
    itemsCount: 1,
    spaceAround: 0,
    shiftLeft: 0,
    ignoreSwipe: false
  };

  /**
   * Slider config
   */
  private _config: RushSliderConfig;

  /**
   * Config list for different screen sizes
   */
  private _configList: Map<number, RushSliderConfig>;

  /**
   * List of slides
   */
  private _slideList: Array<RushSlideComponent>;

  /**
   * Additional slides for infinite scrolling
    */
  private _additionalSlidesList: Array<HTMLElement> = [];

  /**
   * Slider HTML Element
   */
  private _sliderEl: HTMLElement;

  /**
   * Slider track HTML Element
   */
  private _track: HTMLElement;

  /**
   * Single slide width
   */
  private _slideWidth: number;

  /**
   * Width of shift from left side in px
   */
  private _shiftWidth: number;

  /**
   * Current track translate
   */
  private _currentTranslate: number;

  /**
   * Last swipe pointer position
   */
  private _lastSwipeXPosition: number;

  /**
   * Swipe position on swipe begin
   */
  private _startSwipeXPosition: number;

  /**
   * Auto sliding interval
   */
  private _autoSlidingInterval: number;

  /**
   * Is slider controlling enabled
   */
  private _allowControl = true;

  /**
   * Is swiping
   */
  private _isSwiping: boolean;

  /**
   * Number of current slide
   */
  private _currentSlide = 0;

  /**
   * Completes when service destroyed
   */
  private _alive$: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  /**
   * Returns list of slides
   */
  get slideList(): Array<RushSlideComponent> {
    return this._slideList;
  }

  /**
   * Returns current slide index
   */
  get currentSlide(): number {
    return this._currentSlide;
  }

  /**
   * Called when service destroyed
   */
  ngOnDestroy() {
    this._alive$.complete();
  }

  /**
   * Slider initialization
   */
  public init(slideList: Array<RushSlideComponent>, sliderEl: HTMLElement, config: Map<number, RushSliderConfig>) {
    this._configList = config;

    this._slideList = slideList;
    this._sliderEl = sliderEl;
    this._track = sliderEl.querySelector('.track');

    this._resolveConfig();

    this._slideList.forEach((slide, index) => {
      slide.setPosition(index);
    });

    this._buildSlider();

    this._resizeHandle();
    this._touchStartHandle();
    this._touchEndHandle();
    this._touchMoveHandler();
    this._handleIntervalControlEvents();
  }

  /**
   * Show provided slide
   *
   * @param slidePosition
   */
  public goToSlide(slidePosition: number) {
    if (!this._allowControl) {
      return;
    }

    this._enableTransition();


    /**
     * Time for transition enabling
     */
    setTimeout(() => {
      this._allowControl = false;

      const normalizedPosition = this._normaliseSlidePosition(slidePosition);

      this._track.style.transform = `translateX(${this._resolveTranslate(slidePosition)}px)`;

      if (this._currentSlide !== slidePosition) {
        this._deleteActiveClass();
      }

      this._currentSlide = normalizedPosition;

      /**
       * Time until animation end
       */
      setTimeout(() => {
        this._startAutoslidingInterval();
        this._updateSlideClasses();

        if (normalizedPosition !== slidePosition) {
          this._normalizeTrackPosition(normalizedPosition);
        }

        this._allowControl = true;

      }, this._config.speed);
    });
  }

  /**
   * Show prev slide
   */
  public nextSlide() {
    this.goToSlide(this._currentSlide + 1);
  }

  /**
   * Show next slide
   */
  public prevSlide() {
    this.goToSlide(this._currentSlide - 1);
  }

  /**
   * Update css classes for slides
   *
   * @private
   */
  private _updateSlideClasses() {
    this._slideList.forEach((slide, index) => {
      if (index !== this._currentSlide && slide.element.classList.contains('active')) {
        slide.element.classList.remove('active');
      } else if (index === this._currentSlide) {
        slide.element.classList.add('active');
      }
    });
  }

  /**
   * Delete active class
   *
   * @private
   */
  private _deleteActiveClass() {
    this._slideList.forEach((slide, index) => {
      if (slide.element.classList.contains('active')) {
        slide.element.classList.remove('active');
      }
    });
  }

  /**
   * Start auto sliding interval
   *
   * @private
   */
  private _startAutoslidingInterval() {
    this._stopAutoslidingInterval();

    if (this._config.autoSliding) {
      this._autoSlidingInterval = window.setInterval(() => {
        this.nextSlide();
      }, this._config.autoSliding);
    }
  }

  /**
   * Stop auto sliding interval
   *
   * @private
   */
  private _stopAutoslidingInterval() {
    if (this._autoSlidingInterval) {
      clearInterval(this._autoSlidingInterval);
      this._autoSlidingInterval = undefined;
    }
  }

  /**
   * Disable track transition
   *
   * @private
   */
  private _disableTransition() {
    this._track.style.transition = 'none';
  }

  /**
   * Enable track transition
   *
   * @private
   */
  private _enableTransition() {
    setTimeout(() => {
      this._track.style.transition = this._config.speed + 'ms';
    });
  }

  /**
   * Normalize track position for correct infinite scrolling
   *
   * @param slidePosition
   * @private
   */
  private _normalizeTrackPosition(slidePosition: number) {
    this._disableTransition();
    this._track.style.transform = `translateX(${this._resolveTranslate(slidePosition)}px)`;
  }

  /**
   * Slide position normalization
   *
   * @param slidePosition
   * @private
   */
  private _normaliseSlidePosition(slidePosition: number): number {
    if (slidePosition < 0) {
      return this._slideList.length - 1;
    } else if (slidePosition >= this._slideList.length) {
      return 0;
    } else {
      return slidePosition;
    }
  }

  /**
   * Build slider component
   *
   * @private
   */
  private _buildSlider() {
    this._slideWidth = this._sliderEl.offsetWidth / this._config.itemsCount;
    this._shiftWidth = this._slideWidth * this._config.shiftLeft;

    this._slideList.forEach((slide) => {
      slide.element.style.width = this._slideWidth + 'px';
      slide.element.style.padding = `0 ${this._config.spaceAround}px`;
      slide.element.style.boxSizing = `border-box`;
    });

    this._buildAdditionalSlides();

    this._track.style.transform = `translateX(${this._resolveTranslate(0)}px)`;
    this._currentSlide = 0;
    this._updateSlideClasses();
    this._enableTransition();
    this._startAutoslidingInterval();
  }

  /**
   * Build additional slides for correct infinite scrolling
   *
   * @private
   */
  private _buildAdditionalSlides() {
    let depth = 0;

    for (let i = 0; i < this._additionalSlidesCount; i++) {
      const beforeSlide = this._slideList[this._slideList.length - 1 - depth].element.cloneNode(true) as HTMLElement;
      const afterSlide = this._slideList[depth].element.cloneNode(true) as HTMLElement;

      beforeSlide.classList.remove('active');
      afterSlide.classList.remove('active');

      this._additionalSlidesList.push(beforeSlide, afterSlide);

      this._track.appendChild(afterSlide);
      this._track.insertBefore(beforeSlide, this._track.childNodes[0]);

      if (this._slideList[depth + 1]) {
        depth ++;
      }
    }
  }

  /**
   * Apply provided config
   *
   * @param config
   * @private
   */
  private _applyConfig(config: RushSliderConfig) {
    this._config = {...this._defaultConfig, ...config};
  }

  /**
   * Resolve track translate by slide position
   *
   * @param slidePosition
   * @private
   */
  private _resolveTranslate(slidePosition: number): number {
    this._currentTranslate = -(this._shiftWidth + this._slideWidth * (this._additionalSlidesCount + slidePosition));
    return this._currentTranslate;
  }

  /**
   * Remove all additional slides
   *
   * @private
   */
  private _removeAdditionalSlides() {
    this._additionalSlidesList.forEach(slide => {
      slide.remove();
    });
  }

  /**
   * Window resize handler
   *
   * @private
   */
  private _resizeHandle() {
    fromEvent(window, 'resize').pipe(
      takeUntil(this._alive$),
      debounceTime(200)
    ).subscribe(e => {
      const currentSlideBeforeResize: number = this.currentSlide;
      this._resolveConfig();
      this._removeAdditionalSlides();
      this._disableTransition();
      this._buildSlider();

      this._normalizeTrackPosition(currentSlideBeforeResize);
      this._currentSlide = currentSlideBeforeResize;
    });
  }

  /**
   * Touch start handler
   *
   * @private
   */
  private _touchStartHandle() {
    if (this._config.ignoreSwipe) return;

    merge(
      fromEvent(this._track, 'touchstart'),
      fromEvent(this._track, 'mousedown')
    ).pipe(
      takeUntil(this._alive$),
      filter(allowSwipe => this._allowControl)
    ).subscribe(e => {
      this._disableTransition();

      this._startSwipeXPosition = this._getPageXFromEvent(e);
      this._isSwiping = true;
    });
  }

  /**
   * Touch end handler
   *
   * @private
   */
  private _touchEndHandle() {
    if (this._config.ignoreSwipe) return;

    const minDistanceToSlide = 50;

    merge(
      fromEvent(this._track, 'touchend'),
      fromEvent(this._track, 'mouseup'),
      fromEvent(this._track, 'mouseout')
    ).pipe(
      takeUntil(this._alive$),
      filter(allowSwipe => this._isSwiping)
    ).subscribe(e => {
      this._isSwiping = false;

      const swipeDistance = this._startSwipeXPosition - this._lastSwipeXPosition;

      if (Math.abs(swipeDistance) >= minDistanceToSlide) {
        if (swipeDistance < 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      } else {
        this.goToSlide(this._currentSlide);
      }

      this._lastSwipeXPosition = undefined;
    });
  }

  /**
   * Touch move handler
   *
   * @private
   */
  private _touchMoveHandler() {
    if (this._config.ignoreSwipe) return;

    merge(
      fromEvent(this._track, 'touchmove'),
      fromEvent(this._track, 'mousemove')
    ).pipe(
      takeUntil(this._alive$),
      filter(allowSwipe => this._isSwiping),
      map(event => this._getPageXFromEvent(event)),
    ).subscribe(pageX => {
      if (this._lastSwipeXPosition) {
        const shiftX = this._lastSwipeXPosition - pageX;

        this._currentTranslate = this._currentTranslate - shiftX;

        this._track.style.transform = `translateX(${this._currentTranslate}px)`;
      }

      this._lastSwipeXPosition = pageX;
    });
  }

  /**
   * Handle events that controls interval
   *
   * @private
   */
  private _handleIntervalControlEvents() {
    merge(
      fromEvent(this._track, 'mouseleave'),
      fromEvent(this._track, 'touchend')
    ).pipe(
      takeUntil(this._alive$),
    ).subscribe(pageX => {
      this._startAutoslidingInterval();
    });

    merge(
      fromEvent(this._track, 'mouseover'),
      fromEvent(this._track, 'touchstart')
    ).pipe(
      takeUntil(this._alive$),
    ).subscribe(pageX => {
      this._stopAutoslidingInterval();
    });
  }

  /**
   * Returns pageX param from event (touch, mouse)
   *
   * @private
   */
  private _getPageXFromEvent(event) {
    if (event['touches']) {
      return (event as TouchEvent).touches[0].clientX;
    } else {
      return (event as MouseEvent).pageX;
    }
  }

  /**
   * Apply config according to screen size
   *
   * @private
   */
  private _resolveConfig() {
    const screenWidth = window.innerWidth;
    const sizes = Array.from(this._configList.keys()).sort((a, b) => b - a);

    let config: RushSliderConfig;

    sizes.forEach(size => {
      if (screenWidth < size) {
        config = this._configList.get(size);
      }
    });

    this._applyConfig(config || this._configList.get(sizes[0]));
  }

}
