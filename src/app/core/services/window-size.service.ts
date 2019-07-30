import {Injectable} from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { PlatformService } from './universal/platform.service';
import { debounceTime, map } from 'rxjs/operators';

export interface WindowSize {
  width: number | any;
  height: number | any;
}

@Injectable({
  providedIn: 'root'
})

export class WindowSizeService {

  public readonly newWindowSize = new BehaviorSubject<WindowSize>(<WindowSize>{
    width: this._platform.isBrowser ? (<any>window).innerWidth : null,
    height: this._platform.isBrowser ? (<any>window).innerHeight : null
  });

  constructor(
    private _platform: PlatformService
  ) {
    if (this._platform.isBrowser) {
      fromEvent(window, 'resize').pipe(
        debounceTime(100),
        map(event => <WindowSize>{
          width: (<any>window).innerWidth,
          height: (<any>window).innerHeight
        })
      ).subscribe((windowSize) => {
          this.newWindowSize.next(windowSize);
      });
    }
  }


}
