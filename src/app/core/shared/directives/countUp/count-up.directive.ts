import { Directive, ElementRef, Input, Output, EventEmitter, NgZone, AfterViewInit } from '@angular/core';
import { CountUp, CountUpOptions } from './countUp';
import { PlatformService } from '@osd-services/universal/platform.service';

@Directive({
  selector: '[countUp]'
})
export class CountUpDirective implements AfterViewInit {

  _countUp: CountUp;

  // previous end val enables us to count from last endVal
  // when endVal is changed
  _previousEndVal: number;
  private _intersectionObserver: any;

  // the value you want to count to
  @Input('countUp') endVal: number;
  @Input() options: CountUpOptions = {};
  @Input() reanimateOnClick = true;
  @Output() complete = new EventEmitter<void>();

  // Re-animate if preference is set.
  // @HostListener('click')
  // onClick() {
  //   if (this.reanimateOnClick) {
  //     this.animate();
  //   }
  // }

  constructor(
    private _el: ElementRef,
    private _zone: NgZone,
    private _platform: PlatformService
  ) {}


  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      if (this._checkAvailableIntersectionObserver()) {
        this._intersectionObserver = new IntersectionObserver(entries => {
          this._checkForIntersection(entries);
        }, {});
        this._intersectionObserver.observe(<Element>(this._el.nativeElement));
      } else {
        this._run();
      }
    }
  }

  /**
   * check if IntersectionObserver is available
   */
  private _checkAvailableIntersectionObserver(): boolean {
    return window && 'IntersectionObserver' in window;
  }

  /**
   * check if element in browser view
   */
  private _checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
        if (this._checkIfIntersecting(entry)) {
          this._run();
          this._intersectionObserver.unobserve(<Element>(this._el.nativeElement));
          this._intersectionObserver.disconnect();
        }
    });
  }

  private _checkIfIntersecting (entry: IntersectionObserverEntry) {
    return (<any>entry).isIntersecting && entry.target === this._el.nativeElement;
  }

  private _run() {
    if (this._previousEndVal !== undefined) {
      this.options = {
        ...this.options,
        startVal: this._previousEndVal
      };
    }
    this._countUp = new CountUp(this._el.nativeElement, this.endVal, this.options);
    this._animate();
    this._previousEndVal = this.endVal;
  }

  private _animate() {
    this._zone.runOutsideAngular(() => {
      this._countUp.reset();
      this._countUp.start(() => {
        this._zone.run(() => {
          this.complete.emit();
        });
      });
    });
  }
}
