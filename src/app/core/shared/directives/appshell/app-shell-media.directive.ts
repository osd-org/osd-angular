import { Directive, TemplateRef, ViewContainerRef, OnDestroy, Input, OnInit } from '@angular/core';
import { WindowSizeService } from '@osd-services/window-size.service';
import { Subscription } from 'rxjs';

export interface MediaContext {
  type: string;
  width?: number;
  widthMin?: number;
  widthMax?: number;
}

/**
 * example usage *appShellMedia="{type: 'above', width: 1000}"
 * or *appShellMedia="{type: 'between', widthMin: 1000, widthMax: 1200}"
 * @type = 'above' | 'below' | 'between'
 */
@Directive({
  selector: '[appShellMedia]'
})
export class AppShellMediaDirective implements OnInit, OnDestroy {

  private _windowSizeSubscriber: Subscription;
  private _mediaContext: MediaContext = null;
  private _skip = true;

  @Input() set appShellMedia(condition: MediaContext) {
    this._mediaContext = condition;
  }

  constructor(
      private _viewContainer: ViewContainerRef,
      private _templateRef: TemplateRef<any>,
      private _windowSize: WindowSizeService
  ) {

  }

  ngOnInit () {
    this._windowSizeSubscriber = this._windowSize.newWindowSize.subscribe(e => {
      switch (this._mediaContext.type) {
        case 'below':
          if (e.width < this._mediaContext.width) {
            this._clear();
          } else {
            this._create();
          }
          break;

        case 'above':
          if (e.width > this._mediaContext.width) {
            this._clear();
          } else {
            this._create();
          }
          break;

        case 'between':
          if (e.width > this._mediaContext.widthMin && e.width < this._mediaContext.widthMax) {
            this._create();
          } else {
            this._clear();
          }
          break;

        default:
            this._create();
          break;
      }
    });
  }

  private _clear() {
    this._viewContainer.clear();
    this._skip = true;
  }

  private _create() {
    if (this._skip) {
      this._viewContainer.createEmbeddedView(this._templateRef);
      this._skip = false;
    }
  }

  ngOnDestroy() {
    if (this._mediaContext) {
      this._windowSizeSubscriber.unsubscribe();
    }
  }

}
