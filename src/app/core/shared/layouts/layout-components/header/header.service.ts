import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerTitle: string;

  constructor() { }

  get title(): string {
    return this._headerTitle;
  }

  public setTitle(title: string) {
    this._headerTitle = title;
  }
}
