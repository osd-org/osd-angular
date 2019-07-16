import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  public _listLength;
  private _html: any[] = [];

  @Input('html')
  public set html(v : any[]) {
    this._listLength = v.length;
    this._html = v;
  }

  public get html() : any[] {
    return this._html;
  }


  @ViewChild('scrollWrapper') scrollWrapper: ElementRef;
  @ViewChild('bar') bar: ElementRef;

  constructor(
  ) {

  }

  ngOnInit() {
    setTimeout(() => {
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
      this._append();
    }, 1000);
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
    this._flickity.select(this.nearest(e.target.value, this._listLength))
    this._currentRangeVal = this.nearest(e.target.value, this._listLength);
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
    function makeCell() {
      var cell = (<any>document).createElement('div');
      cell.className = 'carousel-cell';
      cell.textContent = '3333';
      cell.style.width = 100 + '%';
      cell.style.height = 100 + '%';
      return cell;
    }
    var cellElems = [ makeCell() ];
    this._flickity.append(cellElems);
    this._listLength++;
  }

  public get dots(): any[] {
    return Array(this._listLength)
  }

}
