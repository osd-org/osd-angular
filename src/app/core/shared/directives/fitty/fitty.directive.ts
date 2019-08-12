
import { Directive, ElementRef, OnInit } from '@angular/core';
import fitty from './fitty';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[fitty]'
})
export class fittyDirective implements OnInit {

  private _fittyEl: Subscription;

  constructor(
    private _elementRef: ElementRef,
  ) {

  }

  ngOnInit() {
    this._init();
  }

  private _init() {
    this._fittyEl = fitty(this._elementRef.nativeElement, {
      minSize: 12,
      maxSize: 40,
      multiLine: false
    })
  }

  ngOnDestroy(): void {
    this._fittyEl.unsubscribe();
  }
}
