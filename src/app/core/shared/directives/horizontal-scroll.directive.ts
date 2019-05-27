
import { Directive, HostListener, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';


@Directive({
  selector: '[horisontalScroll]'
})
export class horisontalScrollDirective implements AfterViewInit {

  private _innerHTMLElements: any = [];
  private _section = null;
  private _lastSection = null;

  @HostListener('wheel', ['$event']) scroll($event){
    this._horisontalScrolling($event);
  }

  constructor(
    private _elementRef: ElementRef,
    private _render: Renderer2
  ) {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._init();
    }, 1000);
  }


  public _init() {
    const rootElement = this._elementRef.nativeElement as HTMLElement;
    const rootElementHeight = rootElement.offsetHeight;
    this._innerHTMLElements = rootElement.querySelectorAll('*');

    this._section = this._render.createElement('section');
    this._render.insertBefore(rootElement, this._section, this._innerHTMLElements[0]);

    this._fillSections(rootElement, rootElementHeight);

  }

  private _fillSections(rootElement, rootElementHeight) {

    this._innerHTMLElements.forEach(el => {
      if (this._section.offsetHeight <= rootElementHeight) {
        this._render.appendChild(this._section, el)
      } else {
        this._lastSection = this._section;
        this._section = this._render.createElement('section');
        this._render.insertBefore(rootElement, this._section, this._render.nextSibling(this._lastSection));
      }});
  }

  private _horisontalScrolling(e) {
    const item = this._elementRef.nativeElement as HTMLElement;
    if (e.deltaY > 0) {
      item.scrollLeft += 100;
    } else {
      item.scrollLeft -= 100;
    }
  }

}
