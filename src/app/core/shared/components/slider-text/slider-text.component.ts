import { Component, ElementRef, Renderer2, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import SweetScroll from 'sweet-scroll';
import { fromEvent } from 'rxjs';
import { throttleTime, debounceTime } from 'rxjs/operators';
import { PageService } from '@osd-services/page.service';
import { untilDestroyed } from '@osd-rxjs/operators';

@Component({
  selector: 'app-slider-text',
  templateUrl: './slider-text.component.html',
  styleUrls: ['./slider-text.component.scss']
})
export class SliderTextComponent implements OnInit, OnDestroy {

  private _innerHTMLElements: any = [];
  private _section = null;
  private _card = null;
  private _lastSection = null;
  private _scroller: SweetScroll;
  public maxRangeVal;
  public currentRangeVal = 0;
  public _time = 1000;
  private _stepPx = 0;

  @ViewChild('scrollWrapper') scrollWrapper: ElementRef;
  @Input('html') html: any;

  constructor(
    private _elementRef: ElementRef,
    private _render: Renderer2,
    private _page: PageService
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
      console.log(this._next());

      this.currentRangeVal = this._next();
      this._scroller.toLeft(this.currentRangeVal);
    } else {
      console.log(this._prev());

      this.currentRangeVal = this._prev();
      this._scroller.toLeft(this.currentRangeVal);
    }
  }

  private _next() {
    this._stepPx++;
    return (this.scrollWrapper.nativeElement.offsetWidth + 100) * this._stepPx;
  }
  private _prev() {
    const prevStep = ((this.scrollWrapper.nativeElement.offsetWidth - 100) * this._stepPx) - ((this.scrollWrapper.nativeElement.offsetWidth - 100) * this._stepPx - 1);
    this._stepPx--;
    return prevStep;
  }

  public _init() {
    const rootElement = this.scrollWrapper.nativeElement;
    this._render.setProperty(this.scrollWrapper.nativeElement, 'innerHTML', '');
    const firstCard = this._render.createElement('div');
    this._render.addClass(firstCard, 'card');
    this._render.appendChild(this.scrollWrapper.nativeElement, firstCard);

    this._section = this._render.createElement('section');
    this._card = this.scrollWrapper.nativeElement.querySelectorAll('.card')[0];
    setTimeout(() => {
      this._render.setProperty(this._section, 'innerHTML', this.html);
      this._innerHTMLElements = this._section.querySelectorAll('*');
      this.maxRangeVal = this._card.clientWidth + 100;
      this._fillSections(rootElement);
      this._scroller = new SweetScroll({
        duration: 500,                 // Specifies animation duration in integer
        easing: 'easeOutQuint',         // Specifies the pattern of easing                // Enable the vertical scroll
        horizontal: true,              // Enable the horizontal scroll
      },
      '.scrolling-wrapper-flexbox');
    }, this._time);
  }

  private _fillSections(rootElement) {
    this._innerHTMLElements.forEach((el: HTMLElement )=> {
      if (!this._checkOverflow(this._card)) {
        if (el.hasAttribute('angular')) {
          let ngEl = this._render.createElement(el.tagName);
          console.log(el.attributes);


        } else {
          this._render.appendChild(this._card, el)
        }
      } else {
        this.maxRangeVal += this._card.clientWidth + 100;
        this._lastSection = this._card;
        this._card = this._render.createElement('div');
        this._render.addClass(this._card, 'card');
        this._render.insertBefore(rootElement, this._card, this._render.nextSibling(this._lastSection));
      }
    });
  }

  private _checkOverflow(card: HTMLElement) {
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
      throttleTime(100),
      debounceTime(20),
    )
    .subscribe(e => {
      this._horisontalScrolling(e)
    });
  }

  public setRange(e) {
    this._scroller.toLeft(parseFloat(e.target.value));
  }

  ngOnDestroy() {

  }
}
