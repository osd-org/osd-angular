import { PlatformService } from '@osd-services/universal/platform.service';
import { Component, ElementRef, Renderer2, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import SweetScroll from 'sweet-scroll';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PageService } from '@osd-services/page.service';
import { untilDestroyed } from '@osd-rxjs/operators';

@Component({
  selector: 'app-slider-text',
  templateUrl: './slider-text.component.html',
  styleUrls: ['./slider-text.component.scss']
})
export class SliderTextComponent implements OnInit, OnDestroy {

  private _innerHTMLElements: any = [];
  private _card = null;
  private _cardWidth: any;
  private _cardList;
  private _section = null;
  private _lastSection = null;
  public activeSlide = 0;
  private _time = 1000;
  private _scroll: SweetScroll;

  public maxRangeVal: any;
  public currentRangeVal: any;



  @ViewChild('scrollWrapper') scrollWrapper: ElementRef;
  @Input('html') html: any;

  constructor(
    private _render: Renderer2,
    private _page: PageService,
    private _platform: PlatformService
  ) {
  }

  ngOnInit() {
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this._init();
    });
    this._scrollEvent$();
  }

  private _horisontalScrolling(e) {
    if (e.deltaY > 0) {
      this.next();
    } else {
      this.prev();
    }
  }

  goTo(testimonialPosition: number) {
    this.currentRangeVal = testimonialPosition * this._cardWidth;
    this._scroll.toLeft(this.currentRangeVal);
    this.activeSlide = testimonialPosition;
  }

  next() {
    if (this.activeSlide + 1 < this._cardList.length) {
      this.goTo(this.activeSlide + 1);
    }
  }

  prev() {
    if (this.activeSlide - 1 >= 0) {
      this.goTo(this.activeSlide - 1);
    }
  }

  public _init() {
    this.currentRangeVal = 0;
    this.activeSlide = 0;
    this.scrollWrapper.nativeElement.style.height = 90 + '%';
    this._render.setProperty(this.scrollWrapper.nativeElement, 'innerHTML', '');
    const firstCard = this._render.createElement('div');
    this._render.addClass(firstCard, 'card');
    this._render.appendChild(this.scrollWrapper.nativeElement, firstCard);
    this._card = this.scrollWrapper.nativeElement.querySelectorAll('.card')[0];
    if (this._platform.isBrowser) {
      this._cardWidth = this._card.scrollWidth;
    }
    setTimeout(() => {
      this._section = this._render.createElement('section');
      this._render.setProperty(this._section, 'innerHTML', this.html);
      this._innerHTMLElements = this._section.querySelectorAll('*');
      const rootElement = this.scrollWrapper.nativeElement;
      this._fillSections(rootElement);
      this._scroll = new SweetScroll({
        duration: 500,                 // Specifies animation duration in integer
        easing: 'easeOutQuint',         // Specifies the pattern of easing                // Enable the vertical scroll
        horizontal: true,              // Enable the horizontal scroll
      },
      '.scrolling-wrapper-flexbox');
    }, this._time);
  }

  private _fillSections(rootElement) {
    this._innerHTMLElements.forEach((el: HTMLElement )=> {
      if (!this._checkOverflow(this._card, el)) {
        this._render.appendChild(this._card, el);
      } else {
        this._lastSection = this._card;
        this._card = this._render.createElement('div');
        this._render.addClass(this._card, 'card');
        this._render.insertBefore(rootElement, this._card, this._render.nextSibling(this._lastSection));
      }
    });
    this._cardList = this.scrollWrapper.nativeElement.querySelectorAll('.card');
    this.scrollWrapper.nativeElement.style.height = 100 + '%';
    this.maxRangeVal = this._cardWidth * (this._cardList.length - 1);
  }

  private _checkOverflow(card: HTMLElement, el: HTMLElement) {
    const curOverflow = card.style.overflow;
    if ( !curOverflow || curOverflow === 'visible' ) {
      card.style.overflow = 'hidden';
    }
    const isOverflowing = card.clientHeight < card.scrollHeight;
    card.style.overflow = curOverflow;
    return isOverflowing;
  }

  private _scrollEvent$() {
    fromEvent(this.scrollWrapper.nativeElement, 'wheel')
    .pipe(
      // throttleTime(100),
      debounceTime(300),
    )
    .subscribe(e => {
      this._horisontalScrolling(e)
    });
  }

  public setRange(e) {
    this._scroll.toLeft(parseFloat(e.target.value));
  }

  ngOnDestroy() {

  }
}
