import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, NgZone } from '@angular/core';
import * as Flickity  from 'flickity';
import { fromEvent } from 'rxjs';
import { debounceTime, skip } from 'rxjs/operators';
import { BodyService } from '@osd-services/body.service';
import { DeviceDetectorService } from 'ngx-device-detector';

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
  private _scrollEventMouse$;
  private _resizeHendler$;

  @Input('html')
  set initHTML(v : any[]) {
    if (this._html) {
      this._resetSlider();
    }
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
    private _ngZone: NgZone,
    private _body: BodyService,
    public device: DeviceDetectorService
  ) {

  }

  ngOnInit() {
    if (!this.device.isMobile()) {
      setTimeout(() => {
        this._fillingText(() => {
          this._initSlider();
        });
      }, 1000);
    }
  }

  private _fillingText(callback) {
    this._ngZone.run(() => {
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
      this._render.setProperty(this.renderText.nativeElement, 'innerHTML', this._html);
    });
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
      this._resizeHendler();
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
    this._scrollEventMouse$ = fromEvent(this.scrollWrapper.nativeElement, 'wheel')
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

  private _resetSlider() {
    if (!this.device.isMobile()) {
      this._flickity.destroy();
      this._render.setProperty(this.scrollWrapper.nativeElement, 'innerHTML', '');
      this._append();
      this._scrollEventMouse$.unsubscribe();
      this._resizeHendler$.unsubscribe();
      this.listLength = 0;
      this._currentRangeVal = 0;
      setTimeout(() => {
        this._fillingText(() => {
          this._initSlider();
          this._flickity.reloadCells();
        });
      }, 1000);
    }
  }

  private _resizeHendler() {
    this._resizeHendler$ = this._body.height$.pipe(
      skip(1),
      debounceTime(300)
    ).subscribe(e => {
      this._resetSlider();
    });
  }
}
