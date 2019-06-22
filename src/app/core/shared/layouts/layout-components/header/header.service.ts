import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public searchInputEvent$ = new Subject();

  private _headerTitle: string;

  constructor() { }

  get title(): string {
    return this._headerTitle;
  }

  public setTitle(title: string) {
    this._headerTitle = title;
  }
}
