import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as Flickity  from 'flickity';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-blog-text',
  templateUrl: './blog-text.component.html',
  styleUrls: ['./blog-text.component.scss']
})
export class BlogTextComponent implements OnInit {
  private _flickity;
  public maxRangeVal: any;
  private _currentRangeVal: any;
  public listLength = 0;
  private _html: any = null;

  @Input('html')
  set initHTML(v : any[]) {
    this._html = v;
  }

  public get html() : any[] {
    return this._html;
  }

  @ViewChild('scrollWrapper') scrollWrapper: ElementRef;
  @ViewChild('renderText') renderText: ElementRef;
  @ViewChild('bar') bar: ElementRef;

  constructor(
    private _render: Renderer2,
  ) {

  }

  ngOnInit() {
    setTimeout(() => {
      this._fillingText(() => {
        this._initSlider();
      });
    }, 1000);
  }

  private _fillingText(callback) {
    const content = this.renderText.nativeElement.querySelectorAll('*');
    let slideList = this.scrollWrapper.nativeElement.querySelectorAll('.carousel-cell');
    let currentSlide = slideList[slideList.length - 1];
    let contentHeight = 0;
    content.forEach((e: HTMLElement) => {
      if (currentSlide.offsetHeight > contentHeight + e.offsetHeight + 50) {
        contentHeight = contentHeight + e.offsetHeight;
        this._render.appendChild(currentSlide, e);
      } else {
        this._append();
        slideList = this.scrollWrapper.nativeElement.querySelectorAll('.carousel-cell');
        currentSlide = slideList[slideList.length - 1];
        contentHeight = 0;
        contentHeight = contentHeight + e.offsetHeight;
        this._render.appendChild(currentSlide, e);
      }
    });
    callback('finish');
    this.listLength = slideList.length;
  }

  private _initSlider() {
      this._flickity = new Flickity( '.carousel', {
        cellAlign: 'left',
        contain: true,
        adaptiveHeight: true,
        prevNextButtons: false,
        pageDots: false,
        freeScroll: true
      });
      this._scrollEvent$();
      this._scrollHendler((e) => {
        this._currentRangeVal = e;
        this.bar.nativeElement.width = 100 + '%';
      });
      this._currentRangeVal = 0;
  }

  public get currentRangeVal(): number {
    return this._currentRangeVal;
  }

  private _scrollEvent$() {
    fromEvent(this.scrollWrapper.nativeElement, 'wheel')
    .pipe(
      debounceTime(300),
    )
    .subscribe(e => {
      this._horisontalScrolling(e)
    });
  }

  private _horisontalScrolling(e) {
    if (e.deltaY > 0) {
      this._flickity.next();
    } else {
      this._flickity.previous();
    }
  }

  public setRange(e) {
    this._currentRangeVal = e.target.value;
    this._flickity.select(this.nearest(e.target.value, this.listLength))
    this._currentRangeVal = this.nearest(e.target.value, this.listLength);
  }

  private nearest(value, steps, min = 0, max = 100){
    const stepSize = max / steps;
    const zerone = Math.round((value - min) * steps/ (max - min)) /steps;
    if ( ((zerone * (max - min) + min) / stepSize) - 1 === -1) {
      return 0;
    } else if ((zerone * (max - min) + min) / stepSize === steps) {
      return ((zerone * (max - min) + min) / stepSize) - 1;
    }
    else {
      return (zerone * (max - min) + min) / stepSize;
    }
  }

  private _scrollHendler(callback) {
    this._flickity.on( 'scroll', function( event, progress ) {
      progress = Math.max( 0, Math.min( 1, event )) * 100;
      callback(progress);
    });
  }

  private _append() {
    const cell = this._render.createElement('div');
    this._render.addClass(cell, 'carousel-cell');
    this._render.setStyle(cell, 'width', '100%');
    this._render.setStyle(cell, 'height', '100%');
    this._render.appendChild(this.scrollWrapper.nativeElement, cell)
  }

  public get dots(): any[] {
    return Array(this.listLength);
  }

}
