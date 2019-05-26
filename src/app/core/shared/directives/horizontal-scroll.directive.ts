
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[horisontalScroll]'
})
export class horisontalScrollDirective {

  @HostListener('wheel', ['$event']) scroll($event){
    this._horisontalScrolling($event);
  }


  constructor(
    private _elementRef: ElementRef,
  ) { }

  private _horisontalScrolling(e) {
    const item = this._elementRef.nativeElement as HTMLElement;
    if (e.deltaY > 0) {
      item.scrollLeft += 100;
    } else {
      item.scrollLeft -= 100;
    }
    console.log(item.querySelectorAll('*'));

  }

}
