import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public searchInputEvent$ = new Subject();

  private _headerTitle: string;

  constructor(
    private _route: Router
  ) { }

  get title(): string {
    return this._headerTitle;
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
