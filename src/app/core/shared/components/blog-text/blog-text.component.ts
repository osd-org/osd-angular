import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, skip } from 'rxjs/operators';
import { BodyService } from '@osd-services/body.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-blog-text',
  templateUrl: './blog-text.component.html',
  styleUrls: ['./blog-text.component.scss']
})
export class BlogTextComponent implements OnInit, OnDestroy {

  private _html: any = null;
  public progress;
  private _scrollEventMouse$;

  @Input('html')
  set initHTML(v : any[]) {
    this._html = v;
  }

  public get html() : any[] {
    return this._html;
  }

  @ViewChild('renderText') renderText: ElementRef;

  constructor(
    public device: DeviceDetectorService
  ) {

  }

  ngOnInit() {
    this._scrollEvent$()
  }

  private _scrollEvent$() {
    this._scrollEventMouse$ = fromEvent(this.renderText.nativeElement, 'wheel')
    .pipe(
      debounceTime(100),
    )
    .subscribe(e => {
      this._horisontalScrolling(e)
    });
  }

  private _horisontalScrolling(e) {
    this.progress = (this.renderText.nativeElement.scrollTop / (this.renderText.nativeElement.scrollHeight - this.renderText.nativeElement.offsetHeight)) * 100;
  }

  ngOnDestroy() {
    this._scrollEventMouse$.unsubscribe();
  }
}
