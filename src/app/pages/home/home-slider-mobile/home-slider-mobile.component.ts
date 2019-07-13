import { HomeSliderMobileSlideComponent } from './home-slider-mobile-slide/home-slider-mobile-slide.component';
import { Component, OnInit, ContentChildren, AfterContentInit, QueryList, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { untilDestroyed } from '@osd-rxjs/operators';

@Component({
  selector: 'app-home-slider-mobile',
  templateUrl: './home-slider-mobile.component.html',
  styleUrls: ['./home-slider-mobile.component.scss']
})
export class HomeSliderMobileComponent implements OnInit, AfterContentInit, OnDestroy {

  @ContentChildren(HomeSliderMobileSlideComponent) slideList: QueryList<HomeSliderMobileSlideComponent>;

  private _slideArray: Array<HomeSliderMobileSlideComponent>;

  private _slidingInterval: number = 5000;

  public currentSlide;

  constructor() { }

  get currentSlideLink(): string {
    if (this._slideArray[this.currentSlide]) {
      return this._slideArray[this.currentSlide].link;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterContentInit() {
    this._slideArray = this.slideList.toArray();
    this.currentSlide = 0;

    this._setZIndex();

    if (this._slideArray.length > 1) {
      timer(this._slidingInterval, this._slidingInterval).pipe(
        untilDestroyed(this)
      ).subscribe(() => {
        this.nextSlide();
      });
    }
  }

  nextSlide() {
    this._slideArray[this.currentSlide].hide(() => {
      this.currentSlide = this._resolveNextSlideNum();
      this._setZIndex();
    });
  }

  private _resolveNextSlideNum(currentSlide:number = this.currentSlide): number {
    const nextSlide = currentSlide + 1;
    return nextSlide < this._slideArray.length - 1 ? nextSlide : 0;
  }

  private _setZIndex() {
    this._slideArray[this.currentSlide].el.nativeElement.style.zIndex = 2;
    this._slideArray[this._resolveNextSlideNum()].el.nativeElement.style.zIndex = 1;
  }

}
