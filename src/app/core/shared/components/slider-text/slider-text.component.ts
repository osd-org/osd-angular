import { Component, ElementRef, Renderer2, HostListener, ViewChild, Input, OnInit } from '@angular/core';
import SweetScroll from 'sweet-scroll';

@Component({
  selector: 'app-slider-text',
  templateUrl: './slider-text.component.html',
  styleUrls: ['./slider-text.component.scss']
})
export class SliderTextComponent implements OnInit {

  private _innerHTMLElements: any = [];
  private _section = null;
  private _card = null;
  private _lastSection = null;
  private _scroller: SweetScroll;

  @ViewChild('scrollWrapper') scrollWrapper: ElementRef;
  @Input('html') html: any;
  @HostListener('wheel', ['$event']) scroll($event){
    this._horisontalScrolling($event);
  }
  constructor(
    private _elementRef: ElementRef,
    private _render: Renderer2
  ) {
  }

  ngOnInit() {
    this._init();
  }

  private _horisontalScrolling(e) {
    if (e.deltaY > 0) {
      this._scroller.toLeft(this.scrollWrapper.nativeElement.scrollLeft + this.scrollWrapper.nativeElement.offsetWidth + 100 );
      // this._scroller.to({ top: 0, left: this.scrollWrapper.nativeElement.scrollLeft + this.scrollWrapper.nativeElement.offsetWidth + 100 });
      // this.scrollWrapper.nativeElement.scrollLeft += 100;
    } else {
      this._scroller.toLeft(this.scrollWrapper.nativeElement.scrollLeft - this.scrollWrapper.nativeElement.offsetWidth - 100 );
      // this._scroller.to({ top: 0, left: this.scrollWrapper.nativeElement.scrollLeft - this.scrollWrapper.nativeElement.offsetWidth - 100 });
      // this.scrollWrapper.nativeElement.scrollLeft -= 100;
    }
  }


  public _init() {
    const rootElement = this.scrollWrapper.nativeElement;
    this._section = this._render.createElement('section');
    this._card = this.scrollWrapper.nativeElement.querySelectorAll('.card')[0];
    setTimeout(() => {
      this._render.setProperty(this._section, 'innerHTML', this.html);
      this._innerHTMLElements = this._section.querySelectorAll('*');
      this._fillSections(rootElement);
      this._scroller = new SweetScroll({
        duration: 1000,                 // Specifies animation duration in integer
        easing: 'easeOutQuint',         // Specifies the pattern of easing                // Enable the vertical scroll
        horizontal: true,              // Enable the horizontal scroll
      },
      '.scrolling-wrapper-flexbox');
    }, 1000);
  }

  private _fillSections(rootElement) {
    this._innerHTMLElements.forEach(el => {
      if (!this.checkOverflow(this._card)) {
        this._render.appendChild(this._card, el)
      } else {
        this._lastSection = this._card;
        this._card = this._render.createElement('div');
        this._render.addClass(this._card, 'card');
        this._render.insertBefore(rootElement, this._card, this._render.nextSibling(this._lastSection));
      }});
  }

  checkOverflow(el) {
    const curOverflow = el.style.overflow;
    if ( !curOverflow || curOverflow === "visible" )
        el.style.overflow = "hidden";
    const isOverflowing = el.clientWidth < el.scrollWidth
        || el.clientHeight < el.scrollHeight;
    el.style.overflow = curOverflow;
    return isOverflowing;
  }
}
