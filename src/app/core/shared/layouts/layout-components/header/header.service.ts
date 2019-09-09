import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PlatformService } from '@osd-services/universal/platform.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public searchInputEvent$ = new Subject();

  private _headerTitle: string = null;

  private _isIE: boolean = null;

  constructor(
    private _route: Router,
    private _platform: PlatformService
  ) {
    if (this._platform.isBrowser) {
      this._isIE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1;
    }
  }

  get title(): string {
    return this._headerTitle;
  }

  public get isIE(): boolean {
    return this._isIE;
  }

  public setTitle(title: string) {
    this._headerTitle = title;
  }

  public routeToCategory() {
    this._route.navigateByUrl(this._getLinkCategory());
  }

  private _getLinkCategory() {
    return this._route.url.split('/').slice(0, 3).join('/');
  }
}
